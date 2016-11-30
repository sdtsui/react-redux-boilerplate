// @flow
import React, { PropTypes } from 'react';
import Menu from '../Menu';
import Blog from '../Blog';
import Welcome from '../Welcome';

const Gallery = (props: Object) => {
  return (
    <div>
      <h1>This is the gallery</h1>
      <button onClick={ () => props.setLocalState({ color: 'red'})}>Red</button>
      <button onClick={ () => props.setLocalState({ color: 'blue'})}>Blue
      </button>
      <h2>Welcome</h2>
      <Welcome/>
      <h2>Blog</h2>
      <Blog/>
    </div>
  );
};

export default Gallery;
