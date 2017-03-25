import React, { Component } from 'react';
import Message from './Message.js';
import SearchBar from './SearchBar.js';
import DateFilter from './DateFilter.js';
import '../styles/message-area.css';
import _ from 'underscore';

class MessageArea extends Component {
  constructor(props) {
    super(props);

    this.clickResetButton = this.clickResetButton.bind(this);
  }
  renderDateRange() {
    if (this.props.startDate === this.props.endDate) {
      return this.props.endDate;
    }
    return this.props.startDate + " - " + this.props.endDate;
  }
  
  clickResetButton () {
      this.props.resetMessages();
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
        <h4>({this.renderDateRange()})</h4>
        <div className="message-area">
          {messages}
        </div>
          <SearchBar
              messageList={this.props.messageArray}
              filterMessages={this.props.filterMessages}
          />
          <DateFilter 
            messages={this.props.messageArray} 
            filterMessages={this.props.filterMessages}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            setStartDate={this.props.setStartDate}
            setEndDate={this.props.setEndDate}
          />
          <button onClick={this.clickResetButton}> Reset</button>
      </div>
    );
  }
}

export default MessageArea;