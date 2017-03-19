import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import TopWordGraph from './TopWordGraph.js';
import _ from 'underscore';

class Content extends Component {
    renderUserTabs() {
        let i = 1;
        return _.map(this.props.userData.users, (value, key) => {
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
              <Tab className="tab-content" eventKey={1} title="Total messages exchanged">
                  {this.props.userData.totalMessages}
              </Tab>
              <Tab className="tab-content" eventKey={2} title="Total Word Frequency">
                  <TopWordGraph words={this.props.userData.allWordCountDictionary}/>
              </Tab>
            </Tabs>
          </Row>
          <Row className="top-buffer">
                <h4>User Data</h4>
                <Tabs className="nav-tabs" defaultActiveKey={1} id="graph-panel">
                  {this.renderUserTabs()}
                </Tabs>
          </Row>
        </Grid>
    );
  }
}

export default Content;
