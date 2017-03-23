import _ from 'underscore';
let MyAnalyzeWorker = require('!worker?inline!babel!./analyze.worker.js'); // eslint-disable-line import/no-webpack-loader-syntax

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
    // @TODO uncomment when figure out how to display meaningful word count
    // let allWords = {};
    let allEmojis = {};
    _.each(this.data.users, (user) => {
        // @TODO uncomment when figure out how to display meaningful word count
        // let words = Object.keys(user.words).map(function(key) {
        //     return [key, user.words[key]];
        // });
        //
        // _.each(user.words, (val, key) => {
        //     if (allWords[key]) {
        //         allWords[key] += val;
        //     } else {
        //         allWords[key] = val;
        //     }
        // });
        //
        // // Sort the array based on the second element
        // words.sort(function(first, second) {
        //     return second[1] - first[1];
        // });
        //
        // user.highestWordCountDictionary = words.slice(0, 5);
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

    // @TODO uncomment when figure out how to display meaningful word count
    // let items = Object.keys(allWords).map(function(key) {
    //     return [key, allWords[key]];
    // });
    //
    // // Sort the array based on the second element
    // items.sort(function(first, second) {
    //     return second[1] - first[1];
    // });
    //
    // this.data.allWordCountDictionary = items.slice(0, 5);
};

Analyzer.prototype.analyzeMessages = function(messages, callback) {
    const worker = new MyAnalyzeWorker();

    // let t2 = performance.now();
    worker.onmessage = (e) => {
        if (e.data.type === 'done') {
            worker.terminate();
        }

        console.log("Analyzer host received: ", e.data.value);

        let users = JSON.parse(e.data.value.users);
        _.each(users, user => {
            user.averageNumberWordsInMessage = user.numWords.reduce((memo, num) => memo + num, 0) / user.numWords.length;
            user.averageMessageLength = user.messageLengths.reduce((memo, num) => memo + num, 0) / user.messageLengths.length;
            user.averageSentiment = user.sentiments.reduce((memo, num) => memo + num, 0) * 1.0 / user.sentiments.length;
        });
        this.data.users = users;
        this.data.totalMessages = e.data.value.totalMessages;
        // let t3 = performance.now();
        // console.log("Analyzing all users took " + (t3 - t2) + " milliseconds.");

        callback();
    };
    worker.postMessage({type: "start", value: JSON.stringify(messages)});
};

export default Analyzer;