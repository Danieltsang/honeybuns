import _ from 'underscore';
import sentimentAnalysis from 'sentiment-analysis';
import nlp from 'compromise';

/**
 * User:
 * { "name":
 *  {
 *    words:
 *    {
 *      "hi": 2,
 *      "bye": 5
 *     },
 *    emojis: {
 *      (emoji): 5
 *    }
 *    numWords: [19, 20, 30],
 *    messageLengths: [123, 119, 179, 200],
 *    sentiments: [0.23, 0.19, -0.79, 1.00],
 *    highestWordCountDictionary: [ [ 'd', 17 ], [ 'c', 11 ], [ 'z', 9 ], [ 'b', 7 ], [ 'y', 6 ] ]
 *    highestEmojiCountDictionary: [ [ 'd', 17 ], [ 'c', 11 ], [ 'z', 9 ], [ 'b', 7 ], [ 'y', 6 ] ]
 *    averageNumberWordsInMessage: 20,
 *    averageMessageLength: 156,
 *    averageSentiment: 0.35
 *   },
 *   messagesSent: 259
 *  }
 * @returns {{getAllData: (function()), update: (function(*, *, *, *)), analyze: (function(*))}}
 */
let userCount = 0;

function Analyzer() {
    this.data = {
        users: {},
        totalMessages: 0,
        allWordCountDictionary: []
    };
}

Analyzer.prototype.getAllData = function() {
    return this.data;
};

Analyzer.prototype.analyzeAllData = function() {
    let allWords = {};
    let allEmojis = {};
    _.each(this.data.users, (user) => {
        // Create items array
        let words = Object.keys(user.words).map(function(key) {
            return [key, user.words[key]];
        });

        _.each(user.words, (val, key) => {
            if (allWords[key]) {
                allWords[key] += val;
            } else {
                allWords[key] = val;
            }
        });

        // Sort the array based on the second element
        words.sort(function(first, second) {
            return second[1] - first[1];
        });

        user.highestWordCountDictionary = words.slice(0, 5);

        let emojis = [];
        if (!_.isEmpty(user.emojis)) {
            emojis = Object.keys(user.emojis).map(function(key) {
                return [key, user.emojis[key]];
            });

            _.each(user.emojis, (val, key) => {
                if (allEmojis[key]) {
                    allEmojis[key] += val;
                } else {
                    allEmojis[key] = val;
                }
            });

            // Sort the array based on the second element
            emojis.sort(function(first, second) {
                return second[1] - first[1];
            });
        }
        user.highestEmojiCountDictionary = emojis.slice(0, emojis.length > 5 ? 5 : emojis.length);
    });

    let items = Object.keys(allWords).map(function(key) {
        return [key, allWords[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    this.data.allWordCountDictionary = items.slice(0, 5);
};

Analyzer.prototype.update = function(user, words, emojis, numWords, messageLength, sentiment) {
    user.totalMessages++;
    Object.keys(words).forEach(word => {
        if (user.words[word]) {
            user.words[word] += words[word];
        } else {
            user.words[word] = words[word];
        }
    });
    Object.keys(emojis).forEach(emoji => {
        if (user.emojis[emoji]) {
            user.emojis[emoji] += words[emoji];
        } else {
            user.emojis[emoji] = words[emoji];
        }
    });
    user.numWords.push(numWords);
    user.messageLengths.push(messageLength);

    user.averageNumberWordsInMessage = _.reduce(user.numWords, (memo, num) => memo + num, 0) / user.numWords.length;
    user.averageMessageLength = _.reduce(user.messageLengths, (memo, num) => memo + num, 0) / user.messageLengths.length;

    if (sentiment !== 0) {
        user.sentiments.push(sentiment);
        user.averageSentiment = _.reduce(user.sentiments, (memo, num) => memo + num, 0) *1.0/ user.sentiments.length;
    }
};

// @TODO use nlp somehow...
Analyzer.prototype.getWords = function(sentence) {
    let sentenceData = nlp(sentence);
    let words = [];
    sentenceData.terms().data().forEach(word => {
        let wordData = nlp(word.text);
        if (wordData.match('(#Singular|#Plural|#Verb|#Adjective|#Value)').out() !== "") {
            words.push(wordData.out());
        }
    });
    // console.log(words);
    return words;
};

Analyzer.prototype.getEmoji = function(word) {
    let wordData = nlp(word);
    if (wordData.match('#Emoji').out() !== "") {
        return wordData.out();
    }
    return null
};

Analyzer.prototype.analyze = function(message) {
    let colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(192,192,192,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)', 'rgba(100,140,250,0.3)', 'rgba(241,190,255,0.3)', 'rgba(0,0,70,0.3)', 'rgba(255,90,70,0.3)', 'rgba(12,90,12,0.3)'];
    let words = {};
    let emojis = {};
    message.message.split(" ").forEach(word => {
        let emoji = this.getEmoji(word);
        if (emoji) {
            if (emojis[emoji]) {
                emojis[emoji] += 1;
            } else {
                emojis[emoji] = 1;
            }
        }
        let w = word.toLowerCase();
        if (words[w]) {
            words[w] += 1;
        } else {
            words[w] = 1;
        }
    });

    this.data.totalMessages++;

    let numWords = message.message.split(" ").length;
    let messageLength = message.message.length;
    let sentiment = sentimentAnalysis(message.message);
    let sentiments = sentiment ? [sentiment] : [];
    if (!this.data.users[message.name]) {
        this.data.users[message.name] = {
            words: words,
            emojis: emojis,
            numWords: [numWords],
            messageLengths: [messageLength],
            sentiments: sentiments,
            averageNumberWordsInMessage: numWords,
            averageMessageLength: messageLength,
            userColor: colors[userCount],
            averageSentiment: sentiment,
            totalMessages: 1
        };
        userCount += 1;
        if (userCount > colors.length-1) {
            userCount = 0
        }
    } else {
        this.update(this.data.users[message.name], words, emojis, numWords, messageLength, sentiment);
    }

};

export default Analyzer;