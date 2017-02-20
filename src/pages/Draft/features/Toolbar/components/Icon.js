import React, { PropTypes } from 'react';

const Icon = props => {
  return (
    <i
      onClick={props.onClick}
      className={`fa fa-${props.icon}`}
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Icon;
