import React, { PropTypes } from 'react';

const ButtonOption = props => {
  return (
    <span
      onClick={props.onClick}
      className="button-option"
    >
      {props.children}
    </span>
  );
};

ButtonOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};


export default ButtonOption;
