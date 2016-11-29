import React, { Component } from 'react';
import UI from '../../helpers/UI';
import Gallery from './Gallery';

const key = 'Gallery';
const initialState = { isVisible: true };

@UI(key, initialState)
class GalleryContainer extends Component {
  render() {
    return <Gallery {...this.props}/>;
  }
}

// default props
GalleryContainer.defaultProps = {};

// propTypes
GalleryContainer.propTypes = {};
