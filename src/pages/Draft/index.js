import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, convertToRaw, AtomicBlockUtils } from 'draft-js';
import { fromRawContentStateToEditorState } from './helpers';
import { InlineControls, BlockControls, BlockStyleButton, styleMap } from './controls';
import {
  toggleClassName,
  firstSelectedBlockHasTecClassName,
} from './blockStyling/applyBlockStyle';
import blockRenderer from './customBlocks/blockRenderer';
import blockStyleFn from './blockStyling/blockStyleFn';
import ImageControls from './controls/ImageControls';
import './blockStyling/blockStyles.scss';
import './styles.scss';
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

  applyBlockStyle = blockStyle => {
    const newEditorState = EditorState.forceSelection(
      toggleClassName(this.state.editorState, blockStyle),
      this.state.editorState.getSelection(),
    );

    this.onChange(newEditorState);
  };

  addImage = () => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'atomic',
      'IMMUTABLE',
      fromJS({ src: 'http://i.imgur.com/zxy9hLn.jpg' })
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
        <BlockControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <BlockStyleButton
          isActive={firstSelectedBlockHasTecClassName(editorState)}
          applyBlockStyle={this.applyBlockStyle}
          focus={this.focus}
        />
        <ImageControls
          addImage={this.addImage}
        />
        <div className={editorClassName} onClick={this.focus}>
          <Editor
            blockRendererFn={blockRenderer}
            blockStyleFn={blockStyleFn}
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
