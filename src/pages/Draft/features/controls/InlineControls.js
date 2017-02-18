import React from 'react';
import Icon from '../../core/components/Icon';
import StyleButton from './StyleButton';
import { BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE } from '../../core/types/inline';

const INLINE_STYLES = [
  { label: <Icon icon="bold"/>, style: BOLD },
  { label: <Icon icon="italic"/>, style: ITALIC },
  { label: <Icon icon="underline"/>, style: UNDERLINE },
  { label: <Icon icon="code"/>, style: CODE },
  { label: <Icon icon="strikethrough"/>, style: STRIKETHROUGH },
];

const InlineStyleControls = props => {
  const { editorState } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default InlineStyleControls;
