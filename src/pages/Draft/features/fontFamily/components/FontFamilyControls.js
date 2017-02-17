import React, { PropTypes } from 'react';
import { styles, prefix } from '../fontFamily';

const createOptions = () => {
  return styles.map(fontSize => {
    return (
      <option
        key={fontSize}
        value={fontSize}
      >
        {fontSize.replace(prefix, '')}
      </option>
    );
  });
};

const FontSizeControls = props => {
  return (
    <select
      value={props.current}
      onChange={e => props.toggle(e.target.value)}
    >
      {createOptions()}
    </select>
  );
};

FontSizeControls.propTypes = {
  toggle: PropTypes.func.isRequired,
  current: PropTypes.string,
};

export default FontSizeControls;
