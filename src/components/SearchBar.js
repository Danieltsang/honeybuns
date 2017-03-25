import React, { Component } from 'react';
import '../styles/searchbar.css';
import { FormControl, FormGroup, ControlLabel, Button, Form } from 'react-bootstrap';

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
          return msg.message.toLowerCase().includes(this.state.value.toLowerCase());
      });
      this.props.filterMessages(msgArray);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.filterForSearchedWord();
  }

  render() {
    return (
      <div className="search-bar">
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId='formInLine' bsSize='sm'>
            <ControlLabel> Search </ControlLabel>
            <FormControl
              type='text'
              value={this.state.value}
              placeholder='enter keyword'
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          {' '}
          <Button type="submit"> Submit </Button>
        </Form>
      </div>
    );
  }
}
/*
<form onSubmit={this.handleSubmit}>
        <label>
          Conversation Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Search!" />
      </form>
*/
export default SearchBar;