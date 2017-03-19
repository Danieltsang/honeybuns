import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
var messages = [
  {
    "date": "2017-03-12, 9:59:47 AM",
    "name": "Christine Yeung",
    "msg": "Dude"
  },
  {
    "date": "2017-03-12, 12:09:51 PM",
    "name": "Danyull",
    "msg": "oh man"
  }
]

class App extends Component {
  constructor (props) {
    super(props);

    this.state={startDate: null, endDate: null};

    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.filterByDateRange = this.filterByDateRange.bind(this);
  }
  filterByDateRange(e) {
      e.preventDefault();
      var start = new Date(this.state.startDate);
      var end = new Date(this.state.endDate);
      console.log(this.state.startDate);
      console.log(this.state.endDate);
      var result = [];
      for (var i = messages.length - 1; i >= 0; i--) {
        var messageDate = new Date(messages[i].date);
        if (messageDate <= end && messageDate >= start) {
          result.push(messages[i]);
        }
      }
      console.log(result);
  }

  setStartDate (e) {
    // start = e.target.value;
    this.setState({startDate: e.target.value})
  }

  setEndDate (e) {
    // end = e.target.value;
    this.setState({endDate: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
        <label>
          start:
          <input type="date" name="start" onChange={this.setStartDate}/>
        </label>
        <label>
          end:
          <input type="date" name="end" onChange={this.setEndDate}/>
        </label>
        <button onClick={this.filterByDateRange}> Submit! </button>
      </form>
      </div>
    );
  }
}

export default App;
