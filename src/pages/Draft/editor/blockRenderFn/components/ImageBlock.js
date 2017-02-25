import React, { Component, PropTypes } from 'react';

class ImageComponent extends Component {
  constructor() {
    super();
    this.focus = () => this.refs.image.focus();
  }

  render() {
    const { props } = this;
    const data = props.data;
    const src = data.get('src');
    return (
      <img
        ref="image"
        src={src}
      />
    );
  }
}

ImageComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ImageComponent;
