import React, { Component } from 'react';

class Main extends Component {
  render() {
    console.log('props', this.props);
    return <h2>This is main</h2>;
  }
}

export default Main;
