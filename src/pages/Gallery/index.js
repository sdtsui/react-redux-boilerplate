import React, { Component } from 'react';
import UI from '../../helpers/UI';
import Gallery from './Gallery';

class GalleryContainer extends Component {
  render() {
    return <Gallery {...this.props}/>;
  }
}
const key = 'Gallery';
const initialState = { isVisible: true };
export default UI(Gallery, key,initialState);

// default props
GalleryContainer.defaultProps = {};

// propTypes
GalleryContainer.propTypes = {};
