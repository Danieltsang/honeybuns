import Papa from 'papaparse';

let nthIndex = (str, pat, n) => {
    let L= str.length;
    let i= -1;
    while(n-- && i++<L){
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
};

onmessage = (e) => { // eslint-disable-line no-undef
    let messages = [];
    console.log("Parse Worker starting: ", e.data);
    Papa.parse(e.data.value, {
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
            // 2017-01-09, 12:41:06 PM
            let date = strings[0] + strings[1].substring(0, dateEnd);
            let name = strings[1].substring(dateEnd + 2, nameEnd);
            let message = strings[1].substring(nameEnd + 2, strings[1].length);
            let m = {
                date, name, message
            };
            messages.push(m);
        },
        complete: () => {
            postMessage({type: "done", value: JSON.stringify(messages)});
        },
        skipEmptyLines: true
    });
};
