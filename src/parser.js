import Analyzer from './analyzer';
import moment from 'moment';
import Message from './message';
let MyWorker = require("worker-loader!./parse.js"); // eslint-disable-line import/no-webpack-loader-syntax

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
    let content = [];
    let file = (e.target.files)[0];
    let a = new Analyzer();
    return {
        parseText: (callback) => {
            const worker = new MyWorker();
            worker.onmessage = (e) => {
                const message = e.data;
                console.log("Host received: ", message);
                if (message.type === 'done') {
                    worker.terminate();
                }
                content = message.value;
                content.forEach((message, i) => {
                    content[i] = new Message(getDate(message.date), message.name, message.message);
                    a.analyze(message);
                });
                a.analyzeAllData();
                if (callback) {
                    callback(content, a.getAllData()); // this should call setstate to notify of completion
                }
            };
            worker.postMessage({type: "start", value: file});
        }
    }
};

export default Parser;
