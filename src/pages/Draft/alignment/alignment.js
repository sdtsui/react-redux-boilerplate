import { EditorState } from 'draft-js';
import { fromJS } from 'immutable';
import { changeBlockData, getSelectedBlockKeys, removeBlockData } from './helpers';
import { blockStyles } from '../draft-types/blockTypes';

const {
  HEADER_ONE,
  HEADER_TWO,
  HEADER_THREE,
  HEADER_FOUR,
  HEADER_FIVE,
  HEADER_SIX,
  CODE_BLOCK,
  BLOCKQUOTE,
  UL,
  OL,
  UNSTYLED,
} = blockStyles;

const textStyles = [
  HEADER_ONE,
  HEADER_TWO,
  HEADER_THREE,
  HEADER_FOUR,
  HEADER_FIVE,
  HEADER_SIX,
  CODE_BLOCK,
  BLOCKQUOTE,
  UL,
  OL,
  UNSTYLED,
];

const dataPath = ['alignment'];

const getBlockAlignment = contentBlock => contentBlock.getData().get('alignment');

const getBlockType = contentBlock => contentBlock.getType();

const alignText = alignment => {

  if (!alignment) {
    return '';
  }

  if (alignment === 'center') {
    return 'text-center';
  }

  if (alignment === 'left') {
    return 'text-left';
  }

  if (alignment === 'right') {
    return 'text-right';
  }

  return '';
};

const alignAtomicBlock = alignment => {

  if (!alignment) {
    return '';
  }

  if (alignment === 'center') {
    return 'atomic-center';
  }

  if (alignment === 'left') {
    return 'atomic-left';
  }

  if (alignment === 'right') {
    return 'atomic-right';
  }

  return '';
};

// Takes in a string or an array
const isType = type => contentBlock => {
  const types = [];
  const mergedTypes = types.concat(type);
  return mergedTypes.some(blockType => blockType === getBlockType(contentBlock));
};

const isTypeText = isType(textStyles);
const isTypeAtomic = isType('atomic');
const isTypeBlockQuote = isType(BLOCKQUOTE);

const blockStyleFn = contentBlock => {
  const alignment = getBlockAlignment(contentBlock);
  const classNames = [];

  if (isTypeAtomic(contentBlock) && alignment) {
    const alignmentClassName = alignAtomicBlock(alignment);
    if (alignmentClassName) {
      classNames.push(alignmentClassName);
    }
  }

  if (isTypeText(contentBlock) && alignment) {
    const alignmentClassName = alignText(alignment);
    if (alignmentClassName) {
      classNames.push(alignmentClassName);
    }
  }

  if (isTypeBlockQuote(contentBlock)) {
    classNames.push('MyEditor-blockquote');
  }

  return classNames.join(' ');
};

const setBlockAlignment = (editorState, alignment) => {
  const selection = editorState.getSelection();
  const alignedEditorState = changeBlockData(editorState, fromJS({ alignment }));
  const newEditorState = EditorState.push(
    editorState,
    alignedEditorState.getCurrentContent(),
    'change-block-data'
  );
  return EditorState.forceSelection(newEditorState, selection);
};

const removeBlockAlignment = editorState => {
  const selection = editorState.getSelection();
  const newEditorState = removeBlockData(editorState, dataPath);
  const contentState = newEditorState.getCurrentContent();
  const newEditorStateWithoutAlignment = EditorState.push(
    editorState,
    contentState,
    'change-block-data'
  );
  return EditorState.forceSelection(newEditorStateWithoutAlignment, selection);
};

const getActiveBlockAlignment = editorState => {
  const contentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const blockAlignment = selectedBlockKeys.reduce(
    (prevVal, blockKey) => {
      const block = contentState.getBlockForKey(blockKey);
      const alignment = getBlockAlignment(block);
      if (alignment === 'center' || alignment === 'left' || alignment === 'right') {
        return [...prevVal, alignment];
      }
      return prevVal;
    },
    []
  );
  return blockAlignment[0] || '';
};

const toggleBlockAlignment = (editorState, alignment) => {
  const activeAlignment = getActiveBlockAlignment(editorState);
  return activeAlignment === alignment
    ? removeBlockAlignment(editorState)
    : setBlockAlignment(editorState, alignment);
};

export {
  isTypeText,
  isTypeAtomic,
  isTypeBlockQuote,
  blockStyleFn,
  toggleBlockAlignment,
  getActiveBlockAlignment,
};
