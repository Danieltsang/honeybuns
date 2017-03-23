import sentimentAnalysis from 'sentiment-analysis';
import nlp from 'compromise';

let users = {};
let userCount = 0;
let totalMessages = 0;

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
 */

function update(user, words, emojis, numWords, messageLength, sentiment) {
    user.totalMessages++;
    // @TODO uncomment when figure out how to display meaningful word count
    // Object.keys(words).forEach(word => {
    //     if (user.words[word]) {
    //         user.words[word] += words[word];
    //     } else {
    //         user.words[word] = words[word];
    //     }
    // });
    Object.keys(emojis).forEach(emoji => {
        if (user.emojis[emoji]) {
            user.emojis[emoji] += emojis[emoji];
        } else {
            user.emojis[emoji] = emojis[emoji];
        }
    });
    user.numWords.push(numWords);
    user.messageLengths.push(messageLength);

    if (sentiment !== 0) {
        user.sentiments.push(sentiment);
    }

    return user;
}

function getEmoji(word) {
    let wordData = nlp(word);
    if (wordData.match('#Emoji').out() !== "") {
        return wordData.out();
    }
    return null
}

function analyze(message) {
    let colors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(192,192,192,0.3)', 'rgba(255,255,0,0.3)', 'rgba(255,0,255,0.3)', 'rgba(100,140,250,0.3)', 'rgba(241,190,255,0.3)', 'rgba(0,0,70,0.3)', 'rgba(255,90,70,0.3)', 'rgba(12,90,12,0.3)'];
    let words = {};
    let emojis = {};

    const m = message.message;
    const name = message.name;

    m.split(" ").forEach(word => {
        let emoji = getEmoji(word);
        if (emoji) {
            if (emojis[emoji]) {
                emojis[emoji] += 1;
            } else {
                emojis[emoji] = 1;
            }
        }
        // let w = word.toLowerCase();
        // if (words[w]) {
        //     words[w] += 1;
        // } else {
        //     words[w] = 1;
        // }
    });

    totalMessages++;

    let numWords = m.split(" ").length;
    let messageLength = m.length;
    let sentiment = sentimentAnalysis(m);
    let sentiments = sentiment ? [sentiment] : [];
    if (!users[name]) {
        users[name] = {
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
        update(users[name], words, emojis, numWords, messageLength, sentiment);
    }
}

onmessage = (e) => { // eslint-disable-line no-undef
    console.log("Analyzer Worker starting: ");

    const messages = JSON.parse(e.data.value);

    messages.forEach((message) => {
        analyze(message);
    });
    postMessage({type: "done", value: {
        users: JSON.stringify(users),
        totalMessages
    }});
};