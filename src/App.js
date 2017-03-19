import React, { Component } from 'react';
import './App.css';
import MessageArea from './components/MessageArea.js'
import Parse from './parse';
import Upload from './components/Upload.js';
import Content from './components/Content.js';
import DateFilter from './components/DateFilter.js';
import { Grid, Row, Col } from 'react-bootstrap';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showMainApp: false,
        uploadLoading: false,
        messageArray: [],
        userData: {}
    };

    this.upload = this.upload.bind(this);
  }
  
  upload(e) {
      this.setState({uploadLoading: true});
      let p = new Parse(e);
      p.parseText((q, data) => {
          this.setState({
              uploadLoading: false,
              showMainApp: true,
              messageArray: q,
              userData: data
          })
      });
  }

 render() {
    let mainArea;
    if (this.state.showMainApp) {
      mainArea = (
        <Grid>
        <Row>
          <Col xs={4} md={4}>
            <MessageArea messageArray={this.state.messageArray}/>
          </Col>
          <Col xs={8} md={8}>
            <Content userData={this.state.userData}/>
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
