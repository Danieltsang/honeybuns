import React, { Component } from 'react';
import '../styles/message.css';

class Message extends Component {
  render() {
    return (
      <div className='message'>
        <div className='msg-date'>
          {this.props.message.date.format("ddd, MMM Do YYYY, h:mm a")}
        </div>
        <div className='msg-name'>
          {this.props.message.name+':'}
        </div>
        <div className='msg-message'>
          {this.props.message.message}
        </div>
      </div>
    );
  }
}

export default Message;
