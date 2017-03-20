import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state={value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterForSearchedWord = this.filterForSearchedWord.bind(this);
  }

  filterForSearchedWord() {
      let msgArray = this.props.messageList.filter(msg => {
          return msg.message.includes(this.state.value);
      });
      this.props.filterMessages(msgArray);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.state.value === '') {
          this.props.resetMessages();
      }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.filterForSearchedWord();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Conversation Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Search!" />
      </form>
    );
  }
}

export default SearchBar;