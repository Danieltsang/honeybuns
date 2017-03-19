import React, { Component } from 'react';
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
              <img src={require('../images/android-instruction-1.png')} alt=''/>
              <img src={require('../images/android-instruction-2.png')} alt=''/>
            </div>
          </div>
          <div>
            <h4> iPhone Text Instructions </h4>
            <div className='image-container'>
              <img src={require('../images/iphone-instruction-1.jpg')} alt=''/>
              <img src={require('../images/iphone-instruction-2.jpg')} alt=''/>
            </div>
          </div>
        </div>
        <div className='upload-btn-ctn upload-ctn'>
          <input type='file' onChange={this.props.onClick}/>
        </div>
      </div>
    );
  }
}

export default Upload;
