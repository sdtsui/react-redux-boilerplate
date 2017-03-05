const handleBeforeInput = (getEditorState) => char => {
  // // TODO: [] remove this is duplicate logic
  const atomicSelection = editorState => {
    const selection = editorState.getSelection();
    const firstBlockKey = selection.getStartKey();
    const sameBlockKeys = selection.getStartKey() === selection.getEndKey();
    const block = editorState.getCurrentContent().getBlockForKey(firstBlockKey);
    const blockType = block.getType();
    return blockType === 'atomic' && sameBlockKeys;
  };
  const isValid = atomicSelection(getEditorState());
  if (isValid) {
    return 'handled';
  }

  return 'not-handled';
};

export default handleBeforeInput;
