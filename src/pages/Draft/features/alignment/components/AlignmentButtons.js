import React, { PropTypes } from 'react';
import Icon from '../../../core/components/Icon';

const AlignmentButtons = props => {
  const toggleBlockAlignment = alignment => () => {
    return props.toggleBlockAlignment(alignment);
  };
  const isActive = alignment => props.activeBlockAlignment === alignment
    ? 'alignment-button isActive'
    : 'alignment-button';
  return (
    <div className="RichEditor-styleButton">
      <span className={isActive('left')} onClick={toggleBlockAlignment('left')}>
        <Icon icon="align-left"/>
      </span>
      <span className={isActive('center')} onClick={toggleBlockAlignment('center')}>
        <Icon icon="align-center"/>
      </span>
      <span className={isActive('right')} onClick={toggleBlockAlignment('right')}>
        <Icon icon="align-right"/>
      </span>
    </div>
  );
};
AlignmentButtons.propTypes = {
  activeBlockAlignment: PropTypes.string.isRequired,
  toggleBlockAlignment: PropTypes.func.isRequired,
};

export default AlignmentButtons;
