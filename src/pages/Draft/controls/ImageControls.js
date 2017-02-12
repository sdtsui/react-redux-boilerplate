import React, { Component, PropTypes } from 'react';

class ImageControls extends Component {
  constructor() {
    super();
    this.state = {
      src: '',
    };
  }

  updateSrc = value => {
    this.setState({ src: value });
  };

  render() {
    const { addImage } = this.props;
    return (
      <span>
        <button onClick={addImage}>Add Image</button>
        <input
          onChange={e => this.updateSrc(e.target.value)}
          type="text"
          value={this.state.src}
        />
      </span>
    );
  }
}

ImageControls.PropTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default ImageControls;
