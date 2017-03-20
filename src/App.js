import React, { Component } from 'react';
import './App.css';
import MessageArea from './components/MessageArea.js'
import Parse from './parse';
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
        userData: {},
        startDate: "",
        endDate: ""
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
              userData: data,
              startDate: q[0].date,
              endDate: q[q.length - 1].date
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
                startDate={this.state.startDate.format("MMMM YYYY")}
                endDate={this.state.endDate.format("MMMM YYYY")}/>
          </Col>
          <Col xs={8} md={8}>
            <Content userData={this.state.userData}/>
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
