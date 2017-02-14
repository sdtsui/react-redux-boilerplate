import React, { Component, PropTypes } from 'react';

class VideoControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      type: 'video',
    };
  }

  updateSrc = src => {
    this.setState({ src });
  };

  addVideo = () => {
    this.props.addMedia({
      src: this.state.src,
      type: this.state.type,
    });
  };

  render() {
    return (
      <span>
        <button onClick={this.addVideo}>Add Video</button>
        <input
          onChange={e => this.updateSrc(e.target.value)}
          type="text"
          value={this.state.src}
        />
      </span>
    );
  }
}

VideoControls.defaultProps = {
  src: '//www.youtube.com/embed/I_dN9IpmOZU',
};

VideoControls.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default VideoControls;
