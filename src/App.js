import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '.'
import Upload from './components/Upload.js'
import MessageArea from './components/MessageArea.js'
import Content from './components/Content.js'
import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {showMainApp: false};

    this.onClickUploadBtn = this.onClickUploadBtn.bind(this);
  }

  onClickUploadBtn () {
    this.setState({showMainApp: true});
  }
  render() {
    let messageArray = [
      {date: '2017-06-05',name: 'brandon', msg: 'Hi there'},
      {date: '2017-06-05',name: 'jason', msg: 'O HAI'},
      {date: '2017-06-05',name: 'brandon', msg: 'your caps is stuck'},
      {date: '2017-06-05',name: 'jason', msg: 'INDEED IT IS'},
      {date: '2017-06-05',name: 'jason', msg: 'DOES IT BOTHER YOU?'},
      {date: '2017-06-05',name: 'brandon', msg: 'yes it does'},
      {date: '2017-06-05',name: 'jason', msg: 'DEAL WITH IT'},
      {date: '2017-06-05',name: 'brandon', msg: 'I CAN\'T HANDLE THIS MADNESS'},
      {date: '2017-06-05',name: 'jason', msg: 'GOOD'},
    ];
    var mainArea;
    if (this.state.showMainApp) {
      mainArea = (
        <Grid>
        <Row>
          <Col xs={4} md={4}>
            <MessageArea messageArray={messageArray}/>
          </Col>
          <Col xs={8} md={8}>
            <Content />
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
