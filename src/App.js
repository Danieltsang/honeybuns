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
      messageArrayPermanent: [],
        userData: {}
    };

    this.upload = this.upload.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.resetMessages = this.resetMessages.bind(this);
  }

  filterMessages(messages) {
      this.setState({messageArray: messages});
  }

  resetMessages() {
      let msgArray = [];
      for (var i = 0; i < this.state.messageArrayPermanent.length - 1; i++) {
          let newMessage = this.state.messageArrayPermanent[i];
          newMessage.date.local().format("YYYY-MM-DD hh:mm:ss A");
          msgArray.push(newMessage);
      }
      this.setState({messageArray: msgArray});
  }
  
  upload(e) {
      this.setState({uploadLoading: true});
      let p = new Parse(e);
      p.parseText((q, data) => {
          this.setState({
              uploadLoading: false,
              showMainApp: true,
              messageArray: q,
              messageArrayPermanent: q,
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
            <MessageArea messageArray={this.state.messageArray} users={this.state.userData.users}/>
          </Col>
          <Col xs={8} md={8}>
            <Content userData={this.state.userData}
                     messages={this.state.messageArray}
                     filterMessages={this.filterMessages}
                     resetMessages={this.resetMessages}
            />
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
