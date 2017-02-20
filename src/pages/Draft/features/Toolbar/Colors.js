import React, { PropTypes } from 'react';
import { SketchPicker } from 'react-color';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from './components/Icon';
import { prefix } from '../../features/fontColor';

const ColorPicker = props => {
  const toggleColor = color => {
    const prefixedColor = `${prefix}${color.hex}`;
    props.toggle(prefixedColor);
  };
  return (
    <SketchPicker
      color={props.current.replace(prefix, '')}
      onChangeComplete={toggleColor}
    />
  );
};

ColorPicker.propTypes = {
  toggle: PropTypes.func.isRequired,
  current: PropTypes.string,
};

const Colors = props => {
  return (
    <ButtonGroup>
      <Button>
        <Icon
          icon="square"
          style={{ color: props.currentColor.replace(prefix, '') }}
        />
        <span style={{position: 'fixed', top: 0, right: 0 }}>
          <ColorPicker
            toggle={props.toggleColor}
            current={props.currentColor}
          />
        </span>
      </Button>
    </ButtonGroup>
  );
};

Colors.propTypes = {
  toggleColor: PropTypes.string.isRequired,
  currentColor: PropTypes.string.isRequired,
};

export default Colors;
