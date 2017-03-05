import { getDefaultKeyBinding } from 'draft-js';
import {
  atomicKeyBindings,
  atomicKeyCommands,
} from '../../features/atomicBlocks/Image/image';

export const handleKeyCommand = (getEditorState, updateEditorState) => command => {
  const editorState = getEditorState();
  const resultHandled = [atomicKeyCommands].some(fn => {
    return fn(command, editorState, updateEditorState) === 'handled';
  });

  if (resultHandled) return 'handled';

  return 'not-handled';
};

export const myKeyBindingFn = getEditorState => e => {
  const editorState = getEditorState();
  let command;

  [atomicKeyBindings].some(fn => {
    const result = fn(editorState, e);
    if (result) command = result;
    return true;
  });

  if (command) return command;

  return getDefaultKeyBinding(e);
};
