import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import TopWordGraph from './TopWordGraph.js';

class Content extends Component {

  render() {
    return (
        <Grid>
          <Row className="top-buffer">
            <h4>Graphs</h4>
            <Tabs className="nav-tabs" defaultActiveKey={1} id="graph-panel">
              <Tab className="tab-content" eventKey={1} title="Number of messages per day">
                  <TopWordGraph topWords={this.props.topWords} wordCount={this.props.wordCount}/>

              </Tab>
              <Tab className="tab-content" eventKey={2} title="Sentiment analysis">
                Sentiment analysis
              </Tab>
              <Tab className="tab-content" eventKey={3} title="Peak hours">
                Peak hours
              </Tab>
            </Tabs>
          </Row>
          <Row className="top-buffer">
            <h4>Most used words</h4>
          </Row>
          <Row className="top-buffer">
            <h4>Average message length</h4>
          </Row>
          <Row className="top-buffer">
            <h4>Who uses the most emoji</h4>
          </Row>
        </Grid>
    );
  }
}

export default Content;
