import React, { Component } from 'react';
import { Tabs, Tab, Grid, Row } from 'react-bootstrap';
import TopUsageGraph from './TopUsageGraph.js';
// import DateFilter from './DateFilter.js';
import { Bar } from 'react-chartjs-2';
import _ from 'underscore';

class Content extends Component {

    renderUserTabs() {
        let i = 1;
        return _.map(this.props.userData.users, (value, key) => {
            let tab = (
                <Tab className="tab-content" eventKey={i} title={key} key={i}>
                    <h4>(Per Message)</h4>
                    <h4>Average number of words: {Math.round(value.averageNumberWordsInMessage)}</h4>
                    <h4>Average number of characters: {Math.round(value.averageMessageLength)}</h4>
                    <h4>Average sentiment: {Math.round(value.averageSentiment * 100) / 100}</h4>
                    <TopUsageGraph value="Emoji" dict={value.highestEmojiCountDictionary}/>
                </Tab>
            );
            i += 1;
            return tab;
        });
    }

    renderUserMessageGraph() {
        let labels = [];
        let data = [];
        _.each(this.props.userData.users, (user, name) => {
            labels.push(name);
            data.push(user.totalMessages);
        });
        const barChartData = {
            labels: labels,
            datasets: [{
                label: 'Messages',
                data: data,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)'
            }]
        };
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
        return (
            <div>
                <Bar
                    maintainAspectRatio={false}
                    data={barChartData}
                    options={options}/>
            </div>
        );
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
                <Tab className="tab-content" eventKey={1} title="Total Messages Sent">
                    {this.renderUserMessageGraph()}
                </Tab>
              <Tab className="tab-content" eventKey={2} title="Total Messages Exchanged">
                  {this.props.userData.totalMessages} messages exchanged
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
