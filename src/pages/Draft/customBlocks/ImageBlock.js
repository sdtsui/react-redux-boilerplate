import React from 'react';

const ImageComponent = props => {
  const { block, contentState } = props;
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  const src = data.get('src');
  return (
    <img src={src}/>
  );
};

export default ImageComponent;
