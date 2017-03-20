import _ from 'underscore';
import sentimentAnalysis from 'sentiment-analysis';

/**
 * User:
 * { "name":
 *  {
 *    words:
 *    {
 *      "hi": 2,
 *      "bye": 5
 *     },
 *    numWords: [19, 20, 30],
 *    messageLengths: [123, 119, 179, 200],
 *    sentiments: [0.23, 0.19, -0.79, 1.00],
 *    highestWordCountDictionary: [ [ 'd', 17 ], [ 'c', 11 ], [ 'z', 9 ], [ 'b', 7 ], [ 'y', 6 ] ]
 *    averageNumberWordsInMessage: 20,
 *    averageMessageLength: 156,
 *    averageSentiment: 0.35
 *   }
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
    _.each(this.data.users, (user) => {
        // Create items array
        let items = Object.keys(user.words).map(function(key) {
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
        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        user.highestWordCountDictionary = items.slice(0, 5);
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

Analyzer.prototype.update = function(user, words, numWords, messageLength, sentiment) {
    Object.keys(words).forEach(word => {
        if (user.words[word]) {
            user.words[word] += words[word];
        } else {
            user.words[word] = words[word];
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

Analyzer.prototype.analyze = function(message) {
    let colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(192,192,192,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)', 'rgba(100,140,250,0.3)', 'rgba(241,190,255,0.3)', 'rgba(0,0,70,0.3)', 'rgba(255,90,70,0.3)', 'rgba(12,90,12,0.3)'];
    let words = {};
    message.message.split(" ").forEach(word => {
        if (words[word]) {
            words[word] += 1;
        } else {
            words[word] = 1;
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
            numWords: [numWords],
            messageLengths: [messageLength],
            sentiments: sentiments,
            averageNumberWordsInMessage: numWords,
            averageMessageLength: messageLength,
            userColor: colors[userCount],
            averageSentiment: sentiment
        };
        userCount += 1;
        if (userCount > colors.length-1) {
            userCount = 0
        }
    } else {
        this.update(this.data.users[message.name], words, numWords, messageLength, sentiment);
    }

};

export default Analyzer;