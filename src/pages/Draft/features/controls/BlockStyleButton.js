import React from 'react';
import './BlockStyleButton.scss';

const BlockStyleButton = props => {

  const addClassNameToBlock = className => () => props.applyBlockStyle(className);
  return (
    <span
      className={props.isActive ? 'star-button isActive' : 'star-button'}
      onMouseDown={addClassNameToBlock('tec')}
    >
      ★
    </span>
  );
};

BlockStyleButton.proptypes = {};

export default BlockStyleButton;
