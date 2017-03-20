import React, { Component } from 'react';
import moment from 'moment';

let messages = [
  {
    "date": "2017-03-12, 9:59:47 AM",
    "name": "asdasdasd",
    "msg": "Dude"
  },
  {
    "date": "2017-03-12, 12:09:51 PM",
    "name": "asdasdasd",
    "msg": "oh man"
  }
];
// 2017-03-12, 9:59:47 AM
class DateFilter extends Component {
  constructor (props) {
    super(props);

    this.state={startDate: null, endDate: null};

    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.filterByDateRange = this.filterByDateRange.bind(this);
  }
  filterByDateRange(e) {
      e.preventDefault();
      let start = moment.utc(this.state.startDate);
      let end = moment.utc(this.state.endDate);
      console.log(this.state.startDate);
      console.log(this.state.endDate);
      let result = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        let messageDate = moment.utc(messages[i].date);
        if (messageDate.isBetween(start, end)) {
          result.push(messages[i]);
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
      <div className="DateFilter">
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

export default DateFilter;
