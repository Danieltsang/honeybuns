import React, { Component } from 'react';
import './App.css';
import MessageArea from './components/MessageArea.js'
import Parse from './parse';
import Upload from './components/Upload.js';
import Content from './components/Content.js';
import DateFilter from './components/DateFilter.js';
import { Grid, Row, Col } from 'react-bootstrap';

//TODO: replace this with parser
var topWords = ['I', 'like', 'turtles'];
var wordCount = {'I': 25, 'like': 10, 'turtles': 5};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {showMainApp: false};

    this.onClickUploadBtn = this.onClickUploadBtn.bind(this);
    this.upload = this.upload.bind(this);
  }

  onClickUploadBtn () {
    this.setState({showMainApp: true});
  }
  
  upload(e) {
      let p = new Parse(e);
      p.parseText();
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
            <Content topWords={topWords} wordCount={wordCount}/>
            <DateFilter />
          </Col>
        </Row>
      </Grid>
      );
    } else {
      mainArea = <Upload onClick={this.onClickUploadBtn}/>;
    }
    return mainArea;
  }
}

export default App;
