/**
 * EXAMPLE:
 * date: "2017-03-17 7:00:47 PM" // string ...for now
 * message: "Yeah" // string
 * name: "Colin Chonn" // string
 */
function Message(date, name, message) {
    this.date = date;
    this.name = name;
    this.message = message;
}

Message.prototpe = {
    getDate: () => {
        return this.date;
    },
    getName: () => {
        return this.name;
    },
    getMessage: () => {
        return this.message;
    },
    setDate: (date) => {
        this.date = date;
    },
    setName: (name) => {
        this.name = name;
    },
    setMessage: (message) => {
        this.message = message;
    }
};

export default Message;

