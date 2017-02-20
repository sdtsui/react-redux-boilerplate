import React, { PropTypes } from 'react';

const Button = props => {
  return (
    <span
      className="text-editor-button"
      onClick={props.onClick}
    >
      {props.children}
    </span>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onClick: PropTypes.func,
};

export default Button;
