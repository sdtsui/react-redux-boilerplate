import { EditorState } from 'draft-js';
import { Map } from 'immutable';

const changeBlockData = (editorState, blockData, dataPath = []) => {
  const oldContentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const newContentState = selectedBlockKeys.reduce(
    (contentState, blockKey) => {
      const block = contentState.getBlockForKey(blockKey);
      const blockMap = contentState.getBlockMap();
      const path = ['data', ...dataPath];
      const newBlock = block.mergeIn(path, blockData);
      return contentState.merge({ blockMap: blockMap.set(blockKey, newBlock) });
    }, oldContentState
  );

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

const getSelectedBlocks = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const startKey = editorState.getSelection().getStartKey();
  const endKey = editorState.getSelection().getEndKey();

  return blockMap.skipUntil((__, k) => k === startKey)
                 .takeUntil((__, k) => k === endKey)
                 .concat(Map([[endKey, blockMap.get(endKey)]]));
};

const getSelectedBlocksAsList = editorState => {
  return getSelectedBlocks(editorState).toList();
};

const getSelectedBlockKeys = editorState => {
  return getSelectedBlocksAsList(editorState).map(block => block.key);
};

const removeBlockData = (editorState, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const newContentState = selectedBlockKeys.reduce(
    (contentState, blockKey) => {
      const block = contentState.getBlockForKey(blockKey);
      const blockMap = contentState.getBlockMap();
      const dataExists = block.get('data').hasIn(dataPath);
      if (!dataExists) {
        return contentState;
      }

      const newBlock = block.deleteIn(['data', ...dataPath]);
      return contentState.merge({ blockMap: blockMap.set(blockKey, newBlock) });
    }, oldContentState
  );

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export {
  changeBlockData,
  getSelectedBlocks,
  removeBlockData,
  getSelectedBlockKeys,
};
