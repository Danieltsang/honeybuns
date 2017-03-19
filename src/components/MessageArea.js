import React, { Component } from 'react';
import Message from './Message.js';
import '../styles/message-area.css';
import _ from 'underscore';

class MessageArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messages = this.props.messageArray.map((msg, i) => {
      let color = 'white';
      if (this.props.users[msg.name]) {
        color = this.props.users[msg.name].userColor;
      }
      return <Message message={msg} key={i} userColor={color}/>;
    });
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