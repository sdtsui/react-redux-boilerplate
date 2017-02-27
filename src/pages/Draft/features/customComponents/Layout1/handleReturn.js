import { LAYOUT } from '../../../core/types/block';
import { handleEnterKey } from './Layout1';

export const handleReturn = (editorState, updateEditorState) => e => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const isCollapsed = selection.isCollapsed();
  const FirstBlockInSelection = editorState.getCurrentContent().getBlockForKey(startKey);
  const type = FirstBlockInSelection.getType();
  if (type === LAYOUT) {
    if (!isCollapsed) {
      return 'handled';
    }
    handleEnterKey(e, editorState, updateEditorState);

    return 'handled';
  }

  return 'not-handled';
};
