import React, { Component, PropTypes } from 'react';

class ImageControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      type: 'image',
    };
  }

  updateSrc = src => {
    this.setState({ src });
  };

  addImage = () => {
    this.props.addMedia({
      src: this.state.src,
      type: this.state.type,
    });
  };

  render() {
    return (
      <span>
        <button onClick={this.addImage}>Add Image</button>
        <input
          onChange={e => this.updateSrc(e.target.value)}
          type="text"
          value={this.state.src}
        />
      </span>
    );
  }
}

ImageControls.defaultProps = {
  src: 'http://i.imgur.com/zxy9hLn.jpg',
};

ImageControls.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default ImageControls;
