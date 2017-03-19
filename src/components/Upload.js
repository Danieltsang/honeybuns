import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap'
import '../styles/upload-area.css';

class Upload extends Component {
  render() {
    return (
      <div>
        <h2 className='upload-ctn'>HONEY POT</h2>
        <div className='upload-image-container'>
          <div>
            <h4> Android Text Instructions </h4>
            <div className='image-container'>
              <img src={require('../images/android-instruction-1.png')}/>
              <img src={require('../images/android-instruction-2.png')}/>
            </div>
          </div>
          <div>
            <h4> iPhone Text Instructions </h4>
            <div className='image-container'>
              <img src={require('../images/iphone-instruction-1.jpg')}/>
              <img src={require('../images/iphone-instruction-2.jpg')}/>
            </div>
          </div>
        </div>
        <div className='upload-btn-ctn upload-ctn'>
          <input type='file' onClick={this.props.onClick}/>
        </div>
      </div>
    );
  }
}

export default Upload;
