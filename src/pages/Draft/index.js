import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import {
  InlineControls,
  BlockControls,
  blockStyles,
  styleMap,
} from './controls';
import './styles.scss';

const getEditorStyles = editorState => {
  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }
  return className;
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
  }

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  render() {
    const { editorState } = this.state;
    const editorClassName = getEditorStyles(editorState);
    console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 4));

    return (
      <div className="RichEditor-root">
        <BlockControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={editorClassName} onClick={this.focus}>
          <Editor
            blockStyleFn={blockStyles}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck
          />
        </div>
      </div>
    );
  }
}

export default RichEditor;
