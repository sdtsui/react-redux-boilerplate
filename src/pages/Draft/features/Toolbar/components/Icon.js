import React, { PropTypes } from 'react';

const Icon = props => {
  return (
    <i
      style={props.style}
      onClick={props.onClick}
      className={`fa fa-${props.icon}`}
    />
  );
};

Icon.propTypes = {
  style: PropTypes.object,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;
