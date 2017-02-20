import React, { PropTypes } from 'react';

const ButtonGroup = props => {
  return (
    <div className="button-group">
      {props.children}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default ButtonGroup;
