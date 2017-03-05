import React, { PropTypes } from 'react';
import './VideoBlock.scss';

const Video = props => {
  const data = props.data;
  const src = data.get('src');
  return (
    <div className="media-component-video-wrapper">
      <iframe
        className="media-component-video-wrapper__iframe"
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

Video.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Video;
