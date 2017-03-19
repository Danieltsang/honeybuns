import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import TopWordGraph from './TopWordGraph.js';
import _ from 'underscore';

class Content extends Component {
    renderUserTabs() {
        let i = 1;
        return _.map(this.props.users, (value, key) => {
            let tab = (
                <Tab className="tab-content" eventKey={i} title={key} key={i}>
                    <h4>(Per Message)</h4>
                    <h4>Average number of words: {value.averageNumberWordsInMessage}</h4>
                    <h4>Average number of characters: {value.averageMessageLength}</h4>
                    <h4>Average sentiment: {value.averageSentiment}</h4>
                    <TopWordGraph words={value.highestWordCountDictionary}/>
                </Tab>
            );
            i += 1;
            return tab;
        });
    }

  render() {
    return (
        <Grid>
          <Row className="top-buffer">
            <h4>Graphs</h4>
            <Tabs className="nav-tabs" defaultActiveKey={1} id="graph-panel">
              <Tab className="tab-content" eventKey={1} title="Number of messages per day">
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
                <h4>User Data</h4>
                <Tabs className="nav-tabs" defaultActiveKey={1} id="graph-panel">
                  {this.renderUserTabs()}
                </Tabs>
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
