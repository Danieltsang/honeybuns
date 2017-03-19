import React, { Component } from 'react';
import { Button, Row } from 'react-bootstrap';

class Upload extends Component {
  render() {
    return (
      <Row>
        <Button bsStyle="primary" bsSize="large">Upload a text file</Button>
      </Row>
    );
  }
}

export default Upload;
