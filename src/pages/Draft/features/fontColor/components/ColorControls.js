import React, { PropTypes } from 'react';
import { SketchPicker } from 'react-color';
import { prefix } from '../fontColor';

const PickerControls = props => {
  const toggleColor = color => {
    const prefixedColor = `${prefix}${color.hex}`;
    props.toggle(prefixedColor);
  };
  console.log(props.current);
  return (
    <SketchPicker
      color={props.current.replace(prefix, '')}
      onChangeComplete={toggleColor}
    />
  );
};

PickerControls.propTypes = {
  toggle: PropTypes.func.isRequired,
  current: PropTypes.string,
};

export default PickerControls;
