import React from 'react';
import StyleButton from './StyleButton';
import * as blockTypes from '../../core/types/block';

const BLOCK_TYPES = [
  { label: 'H1', style: blockTypes.H1 },
  { label: 'H2', style: blockTypes.H2 },
  { label: 'H3', style: blockTypes.H3 },
  { label: 'H4', style: blockTypes.H4 },
  { label: 'H5', style: blockTypes.H5 },
  { label: 'H6', style: blockTypes.H6 },
  { label: 'Blockquote', style: blockTypes.BLOCKQUOTE },
  { label: 'UL', style: blockTypes.UL },
  { label: 'OL', style: blockTypes.OL },
  { label: 'Code Block', style: blockTypes.CODE_BLOCK },
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default BlockStyleControls;
