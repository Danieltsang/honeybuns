import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '.'
import Upload from './components/Upload.js'
import Message from './components/Message.js'
import Content from './components/Content.js'
import { Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {showMainApp: false};
  }
  render() {
    var mainArea;
    if (this.state.showMainApp) {
      mainArea = (
        <Grid>
        <Row>
          <Col xs={4} md={4}>
            <Message />
          </Col>
          <Col xs={8} md={8}>
            <Content />
          </Col>
        </Row>
      </Grid>
      );
    } else {
      mainArea = <Upload />;
    }
    return mainArea;
  }
}

export default App;
