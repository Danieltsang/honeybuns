import React, { Component } from 'react';
import moment from 'moment';

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
// 2017-03-12, 9:59:47 AM
class DateFilter extends Component {
  constructor (props) {
    super(props);

    this.state={
        startDate: null,
        endDate: null,
        resetButton: false
    };

    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.filterByDateRange = this.filterByDateRange.bind(this);
    this.clickResetButton = this.clickResetButton.bind(this);
  }
  filterByDateRange(e) {
      e.preventDefault();
      var start = moment.utc(this.state.startDate);
      var end = moment.utc(this.state.endDate).add(1, 'd');
      console.log(this.state.startDate);
      console.log(this.state.endDate);
      var result = [];
      for (var i = 0; i < this.props.messages.length - 1; i++) {
        var messageDate = moment.utc(this.props.messages[i].date.local().format("YYYY-MM-DD hh:mm:ss A"));
        if (messageDate.isBetween(start.local().format("YYYY-MM-DD hh:mm:ss A"), end.local().format("YYYY-MM-DD hh:mm:ss A"))) {
          let newMessage = this.props.messages[i];
          newMessage.date.local().format("YYYY-MM-DD hh:mm:ss A");
          result.push(newMessage);
        }
      }
      console.log(result);
      this.setState({resetButton: true});
      this.props.filterMessages(result);
  }

  setStartDate (e) {
    this.setState({startDate: e.target.value})
  }

  setEndDate (e) {
    this.setState({endDate: e.target.value})
  }

  clickResetButton () {
      this.setState({resetButton: false});
      this.props.resetMessages();
  }

  render() {
    let area;

    if(!this.state.resetButton) {
        area =  (<form>
            <label>
                start:
                <input type="date" name="start" onChange={this.setStartDate}/>
            </label>
            <label>
                end:
                <input type="date" name="end" onChange={this.setEndDate}/>
            </label>
            <button onClick={this.filterByDateRange}> Submit! </button>
        </form>);
    } else {
        area = <button onClick={this.clickResetButton}> Reset! </button>;
    }
    return (
      <div className="DateFilter">
          {area}
      </div>
    );
  }
}

export default DateFilter;
