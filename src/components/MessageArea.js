import React, { Component } from 'react';
import Message from './Message.js'
import '../styles/message-area.css';

class MessageArea extends Component {
  
  render() {
    var messages = this.props.messageArray.map((msg, i) =>
      <Message message={msg} key={i} />
    );
    return (
      <div className='message-area-title'>
        <h3>Messages</h3>
        <div className="message-area">
          {messages}
        </div>
      </div>
    );
  }
}

export default MessageArea;