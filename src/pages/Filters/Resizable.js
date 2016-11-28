import React, { Component } from 'react';

class Resizable extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const ref = this.resizable;
    console.log(ref.getBoundingClientRect())
  }

  render() {
    return (
      <div
        className="resizable"
        ref={(e) =>!this.resizable? this.resizable = e : null}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Resizable;
