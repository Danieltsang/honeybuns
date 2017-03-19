import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div key= {this.props.index} className="Message">
        {this.props.message.date}
        {this.props.message.name}
        {this.props.message.msg}
      </div>
    );
  }
}

export default Message;
