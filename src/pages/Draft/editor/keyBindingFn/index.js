import { getDefaultKeyBinding } from 'draft-js';
import { removeBlockWithKey, getSelectedBlockKeys } from '../../core/';

const BACKSPACE_ON_ATOMIC_BLOCK = 'BACKSPACE_ON_ATOMIC_BLOCK';

const atomicSelection = editorState => {
  const selection = editorState.getSelection();
  const firstBlockKey = selection.getStartKey();
  const sameBlockKeys = selection.getStartKey() === selection.getEndKey();
  const block = editorState.getCurrentContent().getBlockForKey(firstBlockKey);
  const blockType = block.getType();
  const isValid = blockType === 'atomic' && sameBlockKeys;
  return isValid;
};
// TODO: [] Test
export const handleKeyCommand = (getEditorState, updateEditorState) => command => {
  if (command === BACKSPACE_ON_ATOMIC_BLOCK) {
    console.log(getEditorState().getSelection().toJS());
    const blockKey = getSelectedBlockKeys(getEditorState()).first();
    updateEditorState(removeBlockWithKey(getEditorState(), blockKey));
    return 'handled';
  }
  return 'not-handled';
};

// TODO: [] test
export const myKeyBindingFn = getEditorState => e => {
  console.log('keybindingfn running');
  const backSpace = 8;
  if (e.keyCode === backSpace) {
    console.log('backspace');
    if (atomicSelection(getEditorState())) return BACKSPACE_ON_ATOMIC_BLOCK;
  }
  return getDefaultKeyBinding(e);
};
