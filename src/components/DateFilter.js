import React, { Component } from 'react';
import moment from 'moment';

// 2017-03-12, 9:59:47 AM
class DateFilter extends Component {
  constructor (props) {
    super(props);

    this.filterByDateRange = this.filterByDateRange.bind(this);
  }
  filterByDateRange(e) {
      e.preventDefault();
      let start = moment.utc(this.props.startDate);
      let end = moment.utc(this.props.endDate).add(1, 'd');
      let result = [];
      for (let i = 0; i < this.props.messages.length - 1; i++) {
        let messageDate = moment.utc(this.props.messages[i].date.local().format('YYYY-MM-DD hh:mm:ss A'));
        if (messageDate.isBetween(start.local().format('YYYY-MM-DD hh:mm:ss A'), end.local().format('YYYY-MM-DD hh:mm:ss A'))) {
          let newMessage = this.props.messages[i];
          newMessage.date.local().format('YYYY-MM-DD hh:mm:ss A');
          result.push(newMessage);
        }
      }
      this.props.filterMessages(result);
  }

  render() {
    return (
      <div className='DateFilter'>
          <form>
            <label>
                Start:
                <input type='date' name='Start' onChange={this.props.setStartDate}/>
            </label>
            <label>
                End:
                <input type='date' name='End' onChange={this.props.setEndDate}/>
            </label>
            <button onClick={this.filterByDateRange}> Submit! </button>
        </form>
      </div>
    );
  }
}

export default DateFilter;
