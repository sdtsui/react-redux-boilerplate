import React, { PropTypes } from 'react';
import Button from './Button';

const AlignmentButtons = props => {
  const toggleBlockAlignment = alignment => () => {
    return props.toggleBlockAlignment(alignment);
  };
  const isActive = alignment => props.activeBlockAlignment === alignment
    ? 'alignment-button isActive'
    : 'alignment-button';
  return (
    <div>
      <Button className={isActive('left')} onClick={toggleBlockAlignment('left')}>
        <span>L</span>
      </Button>
      <Button className={isActive('center')} onClick={toggleBlockAlignment('center')}>
        <span>C</span>
      </Button>
      <Button className={isActive('right')} onClick={toggleBlockAlignment('right')}>
        <span>R</span>
      </Button>
    </div>
  );
};
AlignmentButtons.propTypes = {
  activeBlockAlignment: PropTypes.string.isRequired,
  toggleBlockAlignment: PropTypes.func.isRequired,
};

export default AlignmentButtons;
