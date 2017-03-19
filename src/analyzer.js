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
 *    messageLengths: [123, 119, 179, 200]
 *    averageNumberWordsInMessage: 20,
 *    averageMessageLength: 156
 *   }
 *  }
 * @returns {{getAllData: (function()), update: (function(*, *, *, *)), analyze: (function(*))}}
 */

function Analyzer() {
    this.data = {
        users: {}
    };
}

Analyzer.prototype.getAllData = function() {
    return this.data;
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
    user.sentiments.push(sentiment);
    user.averageNumberWordsInMessage = _.reduce(user.numWords, (memo, num) => memo + num, 0) / user.numWords.length;
    user.averageMessageLength = _.reduce(user.messageLengths, (memo, num) => memo + num, 0) / user.messageLengths.length;
    user.averageSentiment = _.reduce(user.averageSentiment, (memo, num) => memo + num, 0) / numWords.length;
};

Analyzer.prototype.analyze = function(message) {
    let words = {};
    message.message.split(" ").forEach(word => {
        if (words[word]) {
            words[word] += 1;
        } else {
            words[word] = 1;
        }
    });
    let numWords = message.message.split(" ").length;
    let messageLength = message.message.length;
    let sentiment = sentimentAnalysis(message.message);
    if (!this.data.users[message.name]) {
        this.data.users[message.name] = {
            words: words,
            numWords: [numWords],
            messageLengths: [messageLength],
            sentiments: [sentimentAnalysis(message.message)],
            averageNumberWordsInMessage: numWords,
            averageMessageLength: messageLength,
            averageSentiment: sentimentAnalysis(message.message)
        };
    } else {
        this.update(this.data.users[message.name], words, numWords, messageLength, sentiment);
    }

};

export default Analyzer;