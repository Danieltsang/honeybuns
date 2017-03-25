import React, { Component } from 'react';
import './App.css';
import MessageArea from './components/MessageArea.js'
import Parser from './parser';
import Upload from './components/Upload.js';
import Content from './components/Content.js';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showMainApp: false,
        uploadLoading: false,
        messageArray: [],
        messageArrayPermanent: [],
        userData: {},
        startDate: new Date(),
        endDate: new Date()
    };

    this.upload = this.upload.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.resetMessages = this.resetMessages.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
  }

  setStartDate (date) {
    this.setState({startDate: date.target.value})
  }

  setEndDate (date) {
    this.setState({endDate: date.target.value})
  }

  filterMessages(messages) {
    this.setState({ messageArray: messages });
  }

  resetMessages() {
    this.setState({ 
      messageArray: this.state.messageArrayPermanent.slice(),
      startDate: this.state.messageArrayPermanent[0].date.format('YYYY-MM-DD'),
      endDate: this.state.messageArrayPermanent[this.state.messageArrayPermanent.length-1].date.format('YYYY-MM-DD'),
     });
  }

  upload(e) {
      this.setState({uploadLoading: true});
      let p = Parser(e);
      p.parseText((q, data) => {
          this.setState({
              uploadLoading: false,
              showMainApp: true,
              messageArrayPermanent: q,
              messageArray: q,
              userData: data,
              startDate: q[0].date.local().format('YYYY-MM-DD'),
              endDate: q[q.length - 1].date.local().format('YYYY-MM-DD')
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
              <MessageArea
                  messageArray={this.state.messageArray}
                  users={this.state.userData.users}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  filterMessages={this.filterMessages}
                  resetMessages={this.resetMessages}
                  setStartDate={this.setStartDate}
                  setEndDate={this.setEndDate}
                />
            </Col>
            <Col xs={8} md={8}>
               <h4>Analysis</h4>
                <Content
                    userData={this.state.userData}
                    messages={this.state.messageArray}
                   />
            </Col>
          </Row>
        </Grid>
      );
    } else if(!this.state.uploadLoading) {
        mainArea = <Upload onClick={this.upload} />;
    } else {
        mainArea = (
            <div className="spinner">
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        );
    }
    return mainArea;
  }
}

export default App;
