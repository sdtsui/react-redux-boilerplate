// @flow
import React, { PropTypes } from 'react';
import AppMenu from '../AppMenu';

const Gallery = (props: Object) => {
  console.log('gallery props', props);
  return (
    <div>
      <h1>This is the gallery</h1>
      <button onClick={ () => props.setState({ color: 'red'})}>Red</button>
      <button onClick={ () => props.setState({ color: 'blue'})}>Blue</button>
      <AppMenu/>
    </div>
  );
};

export default Gallery;
