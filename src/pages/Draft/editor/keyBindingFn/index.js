import { getDefaultKeyBinding } from 'draft-js';
import { removeBlockWithKey, insertNewBlock } from '../../core/';

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

// TODO: [] Test
export const handleKeyCommand = (getEditorState, updateEditorState) => command => {
  if (command === BACKSPACE_ON_ATOMIC_BLOCK) {
    const blockKey = atomicSelection(getEditorState());
    const newEditorState = removeBlockWithKey(getEditorState(), blockKey);
    updateEditorState(newEditorState);
    return 'handled';
  }

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
  if (e.keyCode === backSpace) {
    if (atomicSelection(getEditorState())) return BACKSPACE_ON_ATOMIC_BLOCK;
  }
  if (e.keyCode === enter) {
    if (atomicSelection(getEditorState())) return ENTER_ON_ATOMIC_BLOCK;
  }
  return getDefaultKeyBinding(e);
};
