import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs'

class TopWordGraph extends Component {
  render() {
      let labels_arr = [];
      let data_arr = [];
      let arrayLength = this.props.words.length;
      for (let i = 0; i < arrayLength; i++) {
          labels_arr.push(this.props.words[i][0]);
          data_arr.push(this.props.words[i][1]);
      }

      console.log("labels", labels_arr);
      console.log("data", data_arr);
      let barChartData = {
          labels: labels_arr,
          datasets: [{
              label: 'Most Frequent Words',
              data: data_arr,
              borderWidth: 1
          }]
      };
      let barChartOptions = {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      };
      return <Bar data={barChartData} options={barChartOptions} />;
  }
}

export default TopWordGraph;
