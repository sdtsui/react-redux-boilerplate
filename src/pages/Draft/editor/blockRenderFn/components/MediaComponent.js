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
    const checkedData = Map.isMap(data) ? data : fromJS(data);
    const type = checkedData.has('type') ? checkedData.get('type') : '';

    switch (type) {
      case 'image': {
        return <ImageBlock data={checkedData}/>;
      }
      case 'video': {
        return <VideoBlock data={checkedData}/>;
      }
      default: {
        return null;
      }
    }
  }
}

export default MediaComponent;
