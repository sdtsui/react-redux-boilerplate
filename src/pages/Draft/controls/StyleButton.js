import React, { Component } from 'react';

class StyleButton extends Component {
  constructor(props) {
    super(props);

    this.onToggle = e => {
      e.preventDefault();
      props.onToggle(props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton;
