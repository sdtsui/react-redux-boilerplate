import React, { PropTypes } from 'react';
import './VideoBlock.scss';

const VideoComponent = props => {
  const data = props.data;
  const src = data.get('src');
  return (
    <div className="media-component-video-wrapper">
      {/* Hack to get the iframe to show full screen */}
      <img
        className="media-component-video-wrapper__image"
        src="http://placehold.it/16x9"
        alt="16:9 Image"
      />
      <iframe
        className="media-component-video-wrapper__iframe"
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

VideoComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VideoComponent;
