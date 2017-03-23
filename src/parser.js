import Analyzer from './analyzer';
import Message from './message';
import moment from 'moment';
let MyParseWorker = require('!worker?inline!babel!./parse.worker.js'); // eslint-disable-line import/no-webpack-loader-syntax

let getDate = (stringDate) => {
    // 2017-01-09, 12:41:06 PM
    let date = moment(stringDate, "YYYY-MM-DD hh:mm:ss A");
    if (!date.isValid()) {
        // 7/16/2012, 3:28:37
        date = moment(stringDate, "MM-DD-YYYY HH:mm:ss");
    }
    if (!date.isValid()) {
        date = moment(stringDate);
    }
    return date;
};

/**
 * USAGE:
 * let p = new Parse(e);
 * p.parseText();
 * @param e event returned from input change
 */
const Parser = (e) => {
    let messages = [];
    let file = (e.target.files)[0];
    let a = new Analyzer();
    return {
        parseText: (callback) => {
            const worker = new MyParseWorker(); // Allow Papaparse to use web workers
            worker.onmessage = (e) => {
                const message = e.data;
                console.log("Parser host received: ", message);
                if (message.type === 'done') {
                    worker.terminate();
                }
                messages = JSON.parse(message.value);

                const onFinish = () => {
                    messages.forEach((m, i) => {
                        messages[i] = new Message(getDate(m.date), m.name, m.message);
                    });

                    a.analyzeAllData();
                    if (callback) {
                        callback(messages, a.getAllData()); // this should call setstate to notify of completion
                    }
                };
                a.analyzeMessages(messages, onFinish); // Get analytics on each individual message
            };
            worker.postMessage({type: "start", value: file});
        }
    }
};

export default Parser;
