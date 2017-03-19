import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '.'
import Message from './components/Message.js'
import Content from './components/Content.js'
import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
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
  }
}

export default App;
