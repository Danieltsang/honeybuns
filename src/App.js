import React, { Component } from 'react';
import './App.css';
import Parse from './parse';
import Upload from './components/Upload.js';
import Message from './components/Message.js';
import Content from './components/Content.js';
import { Grid, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js';

//TODO: replace this with parser
let messages = [
    {'date':'???', 'user':'Steve', 'message':'I like turtles'},
    {'date':'???', 'user':'Martin', 'message':'Me too!'},
    {'date':'???', 'user':'Steve', 'message':'No, like, I REALLY like turtles...'},
    {'date':'???', 'user':'Martin', 'message':'Okay whatever man.'}
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {showMainApp: false};

    this.upload = this.upload.bind(this);
  }

  upload(e) {
      let p = new Parse(e);
      p.parseText();
  }

  topWords(messages) {
    //TODO: pick out the top used words from the messages array

    let topWords = ['I', 'like', 'turtles'];
    let wordCount = {'I': 25, 'like': 10, 'turtles': 5};

    return [topWords, wordCount];
  }

  renderTopWords(messages) {
    const BarChart = require("react-chartjs").Bar;

    let temp = this.topWords(messages);
    let topWords = temp[0];
    let wordCount = temp[1];

    let labels_arr = [];
    let data_arr = [];
    let arrayLength = topWords.length;
    for (let i = 0; i < arrayLength; i++) {
      labels_arr.push(topWords[i]);
      data_arr.push(wordCount[topWords[i]]);
    }
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

    return(<BarChart data={barChartData} options={barChartOptions} />);
  }

  render() {
    // let mainArea;
    // if (this.state.showMainApp) {
    //   mainArea = (
    //     <Grid>
    //       <Row>
    //         <Col xs={4} md={4}>
    //           <Message />
    //         </Col>
    //         <Col xs={8} md={8}>
    //           <Content />
    //         </Col>
    //       </Row>
    //     </Grid>
    //   );
    // } else {
    //   mainArea = <Upload />;
    // }
    // return mainArea;
    return (
        <div>
            <input type="file" onChange={this.upload} />
            {this.renderTopWords()}
        </div>
    );
  }
}

export default App;
