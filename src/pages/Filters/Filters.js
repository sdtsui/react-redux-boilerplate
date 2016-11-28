// @flow
import React, { PropTypes } from 'react';
import FilterInput from './FilterInput';
import Resizable from './Resizable';

const Filters = (props: Object) => {
  const { setState } = props;
  const {
    blur,
    brightness,
    contrast,
    grayScale,
    hueRotate,
    invert,
    opacity,
    saturate,
    sepia,
  } = props.filters;

  const stripUnit = (unit) => {
    const regex = /%|px|deg/g;
    return unit.replace(regex, '');
  };

  const filterStyles = (filters) => {
    const filterArray = Object.keys(filters);
    const filterValues = filterArray.reduce((prevVal, filter) => {
      if (filter === 'hueRotate') {
        return prevVal + 'hue-rotate' + '(' + filters[filter] + ') ';
      }
      return prevVal + filter + '(' + filters[filter] + ') ';
    }, '');
    return { WebkitFilter: filterValues }
  };
  
  return (
    <div>
      <section className="filter-menu">
        <h2>CSS Filters</h2>
        <FilterInput
          label="Blur"
          type="range"
          min="0"
          max="10"
          value={stripUnit(blur)}
          onChange={(e) => setState({blur: e.target.value + 'px'})}
        />
        <FilterInput
          label="Brightness"
          type="range"
          min="0"
          max="200"
          value={stripUnit(brightness)}
          onChange={(e) => setState({brightness: e.target.value + '%'})}
        />
        <FilterInput
          label="Contrast"
          type="range"
          min="0"
          max="200"
          value={stripUnit(contrast)}
          onChange={(e) => setState({contrast: e.target.value + '%'})}
        />
        {/*<FilterInput*/}
        {/*label="Drop Shadow"*/}
        {/*type="range"*/}
        {/*min="0"*/}
        {/*max="100"*/}
        {/*onChange={(e) => setState({dropShadow: e.target.value + '%'})}*/}
        {/*/>*/}
        <FilterInput
          label="Greyscale"
          type="range"
          min="0"
          max="100"
          value={stripUnit(grayScale)}
          onChange={(e) => setState({grayScale: e.target.value + '%'})}
        />
        <FilterInput
          label="Hue Rotate"
          type="range"
          min="0"
          max="360"
          value={stripUnit(hueRotate)}
          onChange={(e) => setState({hueRotate: e.target.value + 'deg'})}
        />
        <FilterInput
          label="Invert"
          type="range"
          min="0"
          max="100"
          value={stripUnit(invert)}
          onChange={(e) => setState({invert: e.target.value + '%'})}
        />
        <FilterInput
          label="Opacity"
          type="range"
          min="0"
          max="100"
          value={stripUnit(opacity)}
          onChange={(e) => setState({opacity: e.target.value + '%'})}
        />
        <FilterInput
          label="Saturate"
          type="range"
          min="0"
          max="100"
          value={stripUnit(saturate)}
          onChange={(e) => setState({saturate: e.target.value + '%'})}
        />
        <FilterInput
          label="Sepia"
          type="range"
          min="0"
          max="100"
          value={stripUnit(sepia)}
          onChange={(e) => setState({sepia: e.target.value + '%'})}
        />
      </section>
      <section className="filter-image">
        <Resizable>
          <img
            className="img-responsive"
            style={filterStyles(props.filters)}
            src="./src/assets/img.jpg"
            alt="field image"
          />
        </Resizable>
      </section>
    </div>
  );
};

export default Filters;
