// @flow
import React, { PropTypes } from 'react';

const Menu = (props: Object) => {
  return (
    <div>
      <h1>This is the Menu</h1>
      <button onClick={ () => props.setLocalState({ color: 'brown'})}>Red</button>
      <button onClick={ () => props.setLocalState({ color: 'blue'})}>Blue</button>
    </div>
  );
};

export default Menu;
