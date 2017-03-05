import { getDefaultKeyBinding } from 'draft-js';
import { removeBlockWithKey, insertNewBlock } from '../../core/';

// TODO: [] Add this to image component logic
const BACKSPACE_ON_ATOMIC_BLOCK = 'BACKSPACE_ON_ATOMIC_BLOCK';
const ENTER_ON_ATOMIC_BLOCK = 'ENTER_ON_ATOMIC_BLOCK';
const atomicSelection = editorState => {
  const selection = editorState.getSelection();
  const firstBlockKey = selection.getStartKey();
  const sameBlockKeys = selection.getStartKey() === selection.getEndKey();
  const block = editorState.getCurrentContent().getBlockForKey(firstBlockKey);
  const blockType = block.getType();
  const isValid = blockType === 'atomic' && sameBlockKeys;
  return isValid ? block.getKey() : null;
};

export const handleKeyCommand = (getEditorState, updateEditorState) => command => {
  // TODO: [] Add this to atomic image component
  if (command === BACKSPACE_ON_ATOMIC_BLOCK) {
    const blockKey = atomicSelection(getEditorState());
    const newEditorState = removeBlockWithKey(getEditorState(), blockKey);
    updateEditorState(newEditorState);
    return 'handled';
  }

  // TODO: [] Add this to atomic image component
  if (command === ENTER_ON_ATOMIC_BLOCK) {
    const newEditorState = insertNewBlock(getEditorState());
    console.log('handled!');
    updateEditorState(newEditorState);
    return 'handled';
  }

  return 'not-handled';
};

// TODO: [] test
export const myKeyBindingFn = getEditorState => e => {
  const backSpace = 8;
  const enter = 13;
  // TODO: [] Add this to atomic image component
  if (e.keyCode === backSpace) {
    if (atomicSelection(getEditorState())) return BACKSPACE_ON_ATOMIC_BLOCK;
  }
  if (e.keyCode === enter) {
    if (atomicSelection(getEditorState())) return ENTER_ON_ATOMIC_BLOCK;
  }
  return getDefaultKeyBinding(e);
};
