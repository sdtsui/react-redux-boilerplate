import React, { Component, PropTypes } from 'react';

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {

    return (
      <h1>Hello World!</h1>
    );
  }
}

export default MyComponent;

// default props
MyComponent.defaultProps = {};

// propTypes
MyComponent.propTypes = {};