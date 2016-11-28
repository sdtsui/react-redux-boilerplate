import React from 'react';

const FilterInput = props => {
  const { label, type, min, max, onChange, value } = props;
  return (
    <div>
      <label>{label}</label>
      <br/>
      <input
        type={type}
        min={min}
        max={max}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default FilterInput;
