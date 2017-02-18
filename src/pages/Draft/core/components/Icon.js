import React, { PropTypes } from 'react';

const Icon = props => {
  return <i className={`fa fa-${props.icon}`}/>;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
