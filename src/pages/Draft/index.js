import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Toolbar from './features/Toolbar';
// core
import { fromRawContentStateToEditorState, contentStateLogger } from './core';
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
import extendedBlockRenderMap from './editor/blockRenderMap';
import handleBeforeInput from './editor/handleBeforeInput';
import { handleKeyCommand, myKeyBindingFn } from './editor/keyBindingFn';
// css
import './core/styles/styles.scss';
import './features/alignment/styles/alignment.scss';
import './features/alignment/styles/alignment-buttons.scss';

// remove when done
const externalContentState = {
  entityMap: {
    0: {
      type: "atomic",
      mutability: "IMMUTABLE",
      data: {
        src: "https://www.gamecrate.com/sites/default/files/wp-content/uploads/2015/01/LoL_free_gifts_for_well-behaved_players1.jpg",
        description: "addDescription",
        type: "image"
      }
    }
  },
  blocks: [
    {
      key: "b6nul",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "p6qp",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {
        alignment: "left"
      }
    },
    {
      key: "22eom",
      text: "asdf",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      readOnly: false,
    };
    this.updateEditorState = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
  }

  componentWillMount = () => {
    if (externalContentState) {
      this.updateEditorState(fromRawContentStateToEditorState(externalContentState));
    }
  };

  onTab = e => {
    const maxDepth = 4;
    this.updateEditorState(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  toggleBlockAlignment = alignment => {
    const newEditorState = toggleBlockAlignment(this.state.editorState, alignment);

    return this.updateEditorState(newEditorState);
  };

  toggleFontSize = fontSize => {
    const newEditorState = toggleFontSize(this.state.editorState, fontSize);

    return this.updateEditorState(newEditorState);
  };

  toggleColor = color => {
    const newEditorState = toggleColor(this.state.editorState, color);

    return this.updateEditorState(newEditorState);
  };

  toggleFontFamily = fontFamily => {
    const newEditorState = toggleFontFamily(this.state.editorState, fontFamily);

    return this.updateEditorState(newEditorState);
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
    this.updateEditorState(editorStateWithNewBlock);
  };

  toggleReadOnly = value => {
    this.setState({ readOnly: value || !this.state.readOnly });
  };

  render() {
    // contentStateLogger(this.state.editorState);
    console.log(this.state.editorState.getSelection().toJS());
    const { editorState } = this.state;
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
        <div className="text-editor">
          <Editor
            blockRendererFn={blockRendererFn(
              this.updateEditorState,
              this.getEditorState,
              this.toggleReadOnly,
              this.state.readOnly,
              )}
            blockRenderMap={extendedBlockRenderMap}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
            editorState={editorState}
            handleBeforeInput={handleBeforeInput(this.getEditorState)}
            handleKeyCommand={handleKeyCommand(
              this.getEditorState,
              this.updateEditorState
              )}
            keyBindingFn={myKeyBindingFn(this.getEditorState)}
            onChange={this.updateEditorState}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            readOnly={this.state.readOnly}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

export default RichEditor;
