import React from 'react';
import * as blockTypes from '../../core/types/block';

const BLOCK_TYPES = [
  { label: 'Header 1', style: blockTypes.H1 },
  { label: 'Header 2', style: blockTypes.H2 },
  { label: 'Header 3', style: blockTypes.H3 },
  { label: 'Header 4', style: blockTypes.H4 },
  { label: 'Header 5', style: blockTypes.H5 },
  { label: 'Header 6', style: blockTypes.H6 },
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
      <select
        value={blockType}
        onChange={e => props.onToggle(e.target.value)}
      >
        {BLOCK_TYPES.map(type =>
          <option
            key={type.label}
            label={type.label}
            value={type.style}
          >
            {type.style}
          </option>
        )}
      </select>
    </div>
  );
};

export default BlockStyleControls;
