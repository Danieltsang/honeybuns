import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// x : [{
//   date: "2017-06-05",
//   name: "Brandon",
//   msg: "wyd"
// },
// {
//   date: "2017-06-06",
//   name: "Jason",
//   msg: "nada"
// }]

class App extends Component {

  constructor (props) {
    super(props);

    this.state={startDate: null};
    this.state={endDate: null};

    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.filterByDateRange = this.filterByDateRange.bind(this);
  }
  // getFormData(){ 
  //   var start=document.getElementById('start').value;
  //   var end=document.getElementById('end').value;
  //   /* some other fields */
  //   /* now call ur function by passing the above values */
  //   filterByDateRange(start, end);
  // }
  filterByDateRange() {
      console.log(this.state.startDate);
      console.log(this.state.endDate);
      var start = this.state.startDate;
      var end = this.state.endDate;
      var result = [];
      var messages = [];
      for (var i = messages.length - 1; i >= 0; i--) {
        if (messages[i].date <= end && messages[i].date >= start) {
          result.add(messages[i]);
        }
      }
      console.log(result);
  }

  setStartDate (e) {
    this.setState({startDate: e.target.value})
  }

  setEndDate (e) {
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
