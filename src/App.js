import React, { Component } from 'react';
import './App.css';
import MessageArea from './components/MessageArea.js'
import Parse from './parse';
import Upload from './components/Upload.js';
import Content from './components/Content.js';
import DateFilter from './components/DateFilter.js';
import { Grid, Row, Col } from 'react-bootstrap';
import Chart from 'chart.js';

//TODO: replace this with parser
let messages = [
    {'date':'???', 'user':'Steve', 'message':'I like turtles'},
    {'date':'???', 'user':'Martin', 'message':'Me too!'},
    {'date':'???', 'user':'Steve', 'message':'No, like, I REALLY like turtles...'},
    {'date':'???', 'user':'Martin', 'message':'Okay whatever man.'},
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMainApp: false,
      uploadLoading: false
    };

    this.upload = this.upload.bind(this);
  }
  
  upload(e) {
      this.setState({uploadLoading: true});
      let p = new Parse(e);
      p.parseText(() => {this.setState({uploadLoading: false, showMainApp: true})});
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
    let messageArray = [
      {date: '2017-06-05',name: 'brandon', msg: 'Hi there I just want to inform you that i can type long messages in order to test what will happen when there is stuff that happens and I want some scrollable stuff to happen but i am too lazy to add more messages in order to make the area expand and I am instead trying to make a really long message to make it scroll a little at least but maybe i shouldve used capslocks as the font could be slighlty bigger?'},
      {date: '2017-06-05',name: 'jason', msg: 'O HAI'},
      {date: '2017-06-05',name: 'brandon', msg: 'your caps is stuck'},
      {date: '2017-06-05',name: 'jason', msg: 'INDEED IT IS'},
      {date: '2017-06-05',name: 'jason', msg: 'DOES IT BOTHER YOU?'},
      {date: '2017-06-05',name: 'brandon', msg: 'yes it does'},
      {date: '2017-06-05',name: 'jason', msg: 'DEAL WITH IT'},
      {date: '2017-06-05',name: 'brandon', msg: 'I CAN\'T HANDLE THIS MADNESS AND SO I WILL WRITE A VERY LONG MESSAGE BECAUSE I CAN AND I WANT TO SEE HOW IT WILL RENDER AND FUCK MY STUFF UP OH GOD AM I AFRAID WHAT THIS WILL DO WHY IS THERE NO CHARCTER LIMITS ON WHAT THIS CAN DO THIS IS BULLSHIT WHY MUST THERE BE SO MUCH TEXT BE MORE LIKE TWITTER PLEASE'},
      {date: '2017-06-05',name: 'jason', msg: 'GOOD'},
    ];
    let mainArea;
    if (this.state.showMainApp) {
      mainArea = (
        <Grid>
        <Row>
          <Col xs={4} md={4}>
            <MessageArea messageArray={messageArray}/>
          </Col>
          <Col xs={8} md={8}>
            <Content /> 
            {this.renderTopWords()}
            <DateFilter />
          </Col>
        </Row>
      </Grid>
      );
    } else if(!this.state.uploadLoading) {
      mainArea = <Upload onClick={this.upload}/>;
    } else {
      const divStyle = {
        'marginLeft': '43vw',
        'marginTop': '50vh'
      };
      mainArea = <h1 style={divStyle}>Loading</h1>;
    }
    return mainArea;
  }
}

export default App;
