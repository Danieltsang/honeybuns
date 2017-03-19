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
  getFormData(){ 
    var start=document.getElementById('start').value;
    var end=document.getElementById('end').value;
    /* some other fields */
    /* now call ur function by passing the above values */
    filterByDateRange(start, end);
  }
  filterByDateRange(start, end) {
      var result = [];
      var messages = [];
      for (var i = messages.length - 1; i >= 0; i--) {
        if (messages[i].date <= end && messages[i].date >= start) {
          result.add(messages[i]);
        }
      }
      console.log(result);
      return result;
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
    <input type="date" name="start" />
  </label>
  <label>
    end:
    <input type="date" name="end" />
  </label>
  <input type="submit" value="Submit" onclick="getFormData()" />
</form>
      </div>
    );
  }
}

export default App;
