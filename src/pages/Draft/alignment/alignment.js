import { EditorState } from 'draft-js';
import { fromJS } from 'immutable';
import { changeBlockData, getSelectedBlockKeys, removeBlockData } from './helpers';

const dataPath = ['alignment'];

const getBlockAlignment = contentBlock => contentBlock.getData().get('alignment');

const blockStyleFn = contentBlock => {
  const alignment = getBlockAlignment(contentBlock);

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
  if (activeAlignment === alignment) {
    return removeBlockAlignment(editorState);
  }
  return setBlockAlignment(editorState, alignment);
};

export {
  blockStyleFn,
  getActiveBlockAlignment,
  getBlockAlignment,
  removeBlockAlignment,
  setBlockAlignment,
  toggleBlockAlignment,
};
