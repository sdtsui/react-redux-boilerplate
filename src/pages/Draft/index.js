import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils } from 'draft-js';
import { fromRawContentStateToEditorState } from './core';
import {
  InlineControls,
  BlockControls,
  ImageControls,
  VideoControls,
  FontSizeControls,
  ColorControls,
  FontFamilyControls,
} from './features/controls';
import AlignmentButton, { toggleBlockAlignment, getActiveBlockAlignment } from './features/alignment';
import { toggleFontSize, currentFontSize } from './features/fontSize/fontSize';
import { toggleColor, currentColor } from './features/fontColor/fontColor';
import { toggleFontFamily, currentFontFamily } from './features/fontFamily/fontFamily';
import blockRendererFn from './editor/blockRenderFn';
import customStyleMap from './editor/customStyleMap';
import blockStyleFn from './editor/blockStyleFn';
import customStyleFn from './editor/customStyleFn';

// css
import './core/styles/styles.scss';
import './features/alignment/styles/alignment.scss';
import './features/alignment/styles/alignment-buttons.scss';
import './features/controls/controls.scss';

const externalContentState = {
  entityMap: {},
  blocks: [
    {
      key: 'dl6r3',
      text: 'Why Caralluma?',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'a7d0r',
      text: 'May Help you achieve your health and wellness goals',
      type: 'unordered-list-item',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '4ahjh',
      text: 'May help you control your cravings',
      type: 'unordered-list-item',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '2b7a1',
      text: 'may help you manage your stress',
      type: 'unordered-list-item',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

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

  componentWillMount = () => {
    if (externalContentState) {
      this.onChange(fromRawContentStateToEditorState(externalContentState));
    }
  };

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

  toggleBlockAlignment = alignment => {
    const newEditorState = toggleBlockAlignment(this.state.editorState, alignment);

    return this.onChange(newEditorState);
  };

  toggleFontSize = fontSize => {
    const newEditorState = toggleFontSize(this.state.editorState, fontSize);

    return this.onChange(newEditorState);
  };

  toggleColor = color => {
    const newEditorState = toggleColor(this.state.editorState, color);

    return this.onChange(newEditorState);
  };

  toggleFontFamily = fontFamily => {
    const newEditorState = toggleFontFamily(this.state.editorState, fontFamily);

    return this.onChange(newEditorState);
  };


  // Move to customBlockStyleFn
  addMedia = data => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'atomic',
      'IMMUTABLE',
      fromJS(data)
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const editorStateWithNewBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    this.onChange(editorStateWithNewBlock);
  };

  render() {
    const { editorState } = this.state;
    const editorClassName = getEditorStyles(editorState);

    console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 4));

    return (
      <div className="RichEditor-root">
        <div className="controls">
          <BlockControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <ImageControls
            addMedia={this.addMedia}
          />
          <VideoControls
            addMedia={this.addMedia}
          />
          <AlignmentButton
            activeBlockAlignment={getActiveBlockAlignment(this.state.editorState)}
            toggleBlockAlignment={this.toggleBlockAlignment}
          />
          <FontSizeControls
            current={currentFontSize(this.state.editorState)}
            toggle={this.toggleFontSize}
          />
          <ColorControls
            current={currentColor(this.state.editorState)}
            toggle={this.toggleColor}
          />
          <FontFamilyControls
            current={currentFontFamily(this.state.editorState)}
            toggle={this.toggleFontFamily}
          />
        </div>
        <div className={editorClassName} onClick={this.focus}>
          <Editor
            blockRendererFn={blockRendererFn}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
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
