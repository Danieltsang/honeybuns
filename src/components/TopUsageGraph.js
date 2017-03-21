import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class TopUsageGraph extends Component {
    render() {
        let labels_arr = [];
        let data_arr = [];
        let arrayLength = this.props.dict.length;
        for (let i = 0; i < arrayLength; i++) {
          labels_arr.push(this.props.dict[i][0]);
          data_arr.push(this.props.dict[i][1]);
        }

        const barChartData = {
          labels: labels_arr,
          datasets: [{
              label: 'Most Used ' + this.props.value,
              data: data_arr,
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)'
          }]
        };
        return (
            <div>
                <Bar
                    maintainAspectRatio={false}
                    data={barChartData}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        }
                    }}/>
            </div>
        );
    }
}

TopUsageGraph.propTypes = {
    dict: React.PropTypes.array.isRequired,
    value: React.PropTypes.string.isRequired
};

export default TopUsageGraph;
