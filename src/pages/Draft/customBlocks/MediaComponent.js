import React, { Component } from 'react';

class MediaComponent extends Component {
  render() {
    console.log('rendered a Media Component');
    const { block, contentState } = this.props;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    return <img src={data.get('src')}/>;
  }
}

export default MediaComponent;
