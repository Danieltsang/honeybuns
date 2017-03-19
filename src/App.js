import React, { Component } from 'react';
import './App.css';
import Parse from './parse';
import Upload from './components/Upload.js';
import Message from './components/Message.js';
import Content from './components/Content.js';
import { Grid, Row, Col } from 'react-bootstrap';

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

  render() {
    let mainArea;
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
    return (
        <div>
            <input type="file" onChange={this.upload}/>
            {mainArea}
        </div>
    );
  }
}

export default App;
