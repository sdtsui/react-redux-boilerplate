import React, { Component } from 'react';
import { Map, fromJS } from 'immutable';
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

    let type;
    if (Map.isMap(data)) {
      type = data.has('type') ? data.get('type') : '';
    } else {
      const immutableData = fromJS(data);
      type = immutableData.has(type ? data.get('type') : '');
    }

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
