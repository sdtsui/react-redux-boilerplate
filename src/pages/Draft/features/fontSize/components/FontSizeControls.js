import React, { PropTypes } from 'react';
import { fontSizes, prefix } from '../fontSize';

const createOptions = () => {
  return fontSizes.map(fontSize => {
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
    <select onChange={e => props.toggleFontSizeStyle(e.target.value)}>
      {createOptions()}
    </select>
  );
};

FontSizeControls.propTypes = {
  toggleFontSizeStyle: PropTypes.func.isRequired,
};

export default FontSizeControls;
