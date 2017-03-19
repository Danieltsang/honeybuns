import React, { Component } from 'react';
import Message from './Message.js'

class MessageArea extends Component {
  
  render() {
    var messages = this.props.messageArray.map((msg, i) =>
      <Message message={msg} index={i} />
    );
    return (
      <div className="Message">
        {messages}
      </div>
    );
  }
}

export default MessageArea;