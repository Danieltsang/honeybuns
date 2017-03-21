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
    getDate: function() {
        return this.date;
    },
    getName: function() {
        return this.name;
    },
    getMessage: function() {
        return this.message;
    },
    setDate: function(date) {
        this.date = date;
    },
    setName: function(name) {
        this.name = name;
    },
    setMessage: function(message) {
        this.message = message;
    }
};

export default Message;

