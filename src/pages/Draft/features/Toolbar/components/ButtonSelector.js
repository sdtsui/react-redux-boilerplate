import React, { PropTypes } from 'react';
import Icon from '../../../core/components/Icon';

const ButtonSelector = props => {
  return (
    <span
      onClick={props.onClick}
      className="button-selector"
    >
      <Icon icon="caret-down"/>
    </span>
  );
};

ButtonSelector.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default ButtonSelector;
