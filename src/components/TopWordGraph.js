import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs'

class TopWordGraph extends Component {

  render() {

      var labels_arr = [];
      var data_arr = [];
      var arrayLength = this.props.topWords.length;
      for (var i = 0; i < arrayLength; i++) {
          labels_arr.push(this.props.topWords[i]);
          data_arr.push(this.props.wordCount[this.props.topWords[i]]);
      }
      var barChartData = {
          labels: labels_arr,
          datasets: [{
              label: 'Most Frequent Words',
              data: data_arr,
              borderWidth: 1
          }]
      };

      var barChartOptions = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      };

      return(<Bar data={barChartData} options={barChartOptions} />);
  }
}

export default TopWordGraph;
