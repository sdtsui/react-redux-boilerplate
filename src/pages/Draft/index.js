import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils } from 'draft-js';
import Toolbar from './features/Toolbar';
// core
import { fromRawContentStateToEditorState } from './core';
// features
import { toggleColor, currentColor } from './features/fontColor/index';
import { toggleFontSize, currentFontSize } from './features/fontSize/index';
import { toggleFontFamily, currentFontFamily } from './features/fontFamily/index';
import { toggleBlockAlignment, getActiveBlockAlignment } from './features/alignment';
// editor props
import blockStyleFn from './editor/blockStyleFn';
import customStyleFn from './editor/customStyleFn';
import customStyleMap from './editor/customStyleMap';
import blockRendererFn from './editor/blockRenderFn';
// css
import './core/styles/styles.scss';
import './features/alignment/styles/alignment.scss';
import './features/alignment/styles/alignment-buttons.scss';
import './editor/editor.scss';

// remove when done
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
    //console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 4));

    return (
      <div className="text-editor-component">
        <Toolbar
          addMedia={this.addMedia}
          activeBlockAlignment={getActiveBlockAlignment(this.state.editorState)}
          currentFontSize={currentFontSize(this.state.editorState)}
          currentFontFamily={currentFontFamily(this.state.editorState)}
          currentColor={currentColor(this.state.editorState)}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          toggleColor={this.toggleColor}
          toggleBlockAlignment={this.toggleBlockAlignment}
          toggleFontSize={this.toggleFontSize}
          toggleFontFamily={this.toggleFontFamily}
        />
        <div className="text-editor" onClick={this.focus}>
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
