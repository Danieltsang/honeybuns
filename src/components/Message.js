import React, { Component } from 'react';
import '../styles/message.css';

class Message extends Component {
  render() {
    return (
      <div key={this.props.index} className='message'>
        <div className='msg-date'>
          {this.props.message.date}
        </div>
        <div className='msg-name'>
          {this.props.message.name+':'}
        </div>
        <div className='msg-message'>
          {this.props.message.msg}
        </div>
      </div>
    );
  }
}

export default Message;