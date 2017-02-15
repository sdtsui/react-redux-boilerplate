import React, { Component } from 'react';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';

class MediaComponent extends Component {
  render() {
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    if (!entityKey) {
      return null;
    }
    const data = contentState.getEntity(entityKey).getData();
    const type = data.has('type') ? data.get('type') : '';

    switch (type) {
      case 'image': {
        return <ImageBlock data={data}/>;
      }
      case 'video': {
        return <VideoBlock data={data}/>;
      }
      default: {
        return <div>Unknown block</div>;
      }
    }
  }
}

export default MediaComponent;
