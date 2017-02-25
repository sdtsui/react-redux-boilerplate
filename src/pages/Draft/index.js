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
      key: "bh71m",
      text: "This is a title",
      type: "header-one",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {
        media: {
          type: "image",
          src: "http://placehold.it/350x450"
        },
        alignment: "center"
      }
    },
    {
      key: "9v5pp",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "dn7o6",
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
      data: {}
    },
    {
      key: "3eir8",
      text: "What is Lorem Ipsum?",
      type: "header-four",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "fhhac",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 11,
          style: "BOLD"
        }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "3766t",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "layout",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 11,
          style: "BOLD"
        },
        {
          offset: 574,
          length: 11,
          style: "BOLD"
        }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "f1bsd",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "layout",
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 11,
          style: "BOLD"
        },
        {
          offset: 574,
          length: 11,
          style: "BOLD"
        }
      ],
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
      modal: null,
    };
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

  setModal = component => {
    this.setState({ modal: component });
  };

  render() {
    // contentStateLogger(this.state.editorState);
    const { editorState } = this.state;
    return (
      <div className="text-editor-component">
        <div className="modal-mount">
          {this.state.modal}
        </div>
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
            blockRendererFn={blockRendererFn(this.setModal)}
            blockRenderMap={extendedBlockRenderMap}
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
