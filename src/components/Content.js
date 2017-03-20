import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row } from 'react-bootstrap';
import TopWordGraph from './TopWordGraph.js';
// import DateFilter from './DateFilter.js';
import SearchBar from './SearchBar.js';
import _ from 'underscore';

class Content extends Component {
    constructor(props) {
        super(props);

        this.clickResetButton = this.clickResetButton.bind(this);
    }

    clickResetButton () {
        this.props.resetMessages();
    }

    renderUserTabs() {
        let i = 1;
        return _.map(this.props.userData.users, (value, key) => {
            let tab = (
                <Tab className="tab-content" eventKey={i} title={key} key={i}>
                    <h4>(Per Message)</h4>
                    <h4>Average number of words: {Math.round(value.averageNumberWordsInMessage)}</h4>
                    <h4>Average number of characters: {Math.round(value.averageMessageLength)}</h4>
                    <h4>Average sentiment: {Math.round(value.averageSentiment * 100) / 100}</h4>
                    <TopWordGraph words={value.highestWordCountDictionary}/>
                </Tab>
            );
            i += 1;
            return tab;
        });
    }

    /**
     * <DateFilter messages={this.props.messages} filterMessages={this.props.filterMessages}/>
     * Add this back when add support for other date format
     * @returns {XML}
     */
  render() {
    return (
        <Grid>
          <Row>
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
              <div className="search-bar">
                  <SearchBar
                      messageList={this.props.messages}
                      filterMessages={this.props.filterMessages}
                      resetMessages={this.clickResetButton}/>
                  <button onClick={this.clickResetButton}> Reset</button>
              </div>
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
