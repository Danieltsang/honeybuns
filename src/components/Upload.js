import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap'

class Upload extends Component {
  render() {
    return (
      <Row>
        <Button bsStyle="primary" bsSize="large" onClick={this.props.onClick}>Upload a text file</Button>
      </Row>
    );
  }
}

export default Upload;