import Message from './message.js';
import Papa from 'papaparse';
import Analyzer from './analyzer';
import moment from 'moment';

let nthIndex = (str, pat, n) => {
    let L= str.length;
    let i= -1;
    while(n-- && i++<L){
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
};

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
const Parse = (e) => {
    let content = [];
    let file = (e.target.files)[0];
    let a = new Analyzer();
    return {
        parseText: (callback) => {
            Papa.parse(file, {
                newline: '\r\n',
                step: (results) => {
                    // Example of results returned in an array
                    // 0: "2017-03-12"
                    // 1: " 9:59:47 AM: Ana Lala: Dude"
                    let strings = results.data[0];
                    if (strings.length === 1) {
                        return; // find a way to handle message that wraps but does a new line first
                    }
                    let dateEnd = nthIndex(strings[1], ":", 3);
                    let nameEnd = nthIndex(strings[1], ":", 4);
                    if (nameEnd === -1) { // Auto-message: Messages you send to this chat and calls are now secured with end-to-end encryption.
                        return;
                    }
                    let stringDate = strings[0] + strings[1].substring(0, dateEnd);
                    // 2017-01-09, 12:41:06 PM
                    let date = getDate(stringDate);
                    let name = strings[1].substring(dateEnd + 2, nameEnd);
                    let message = strings[1].substring(nameEnd + 2, strings[1].length);
                    let m = new Message(date, name, message);
                    a.getAllData();
                    a.analyze(m);
                    content.push(m);
                },
                complete: () => {
                    a.analyzeAllData();
                    if (callback) {
                        callback(content, a.getAllData()); // this should call setstate to notify of completion
                    }
                },
                fastMode: true,
                skipEmptyLines: true
            });
        }
    }
};

export default Parse;
