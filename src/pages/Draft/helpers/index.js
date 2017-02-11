import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Map } from 'immutable';

// only needs blocks an array of blocks
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

const changeBlockDataForBlockKeys = (
  editorState,
  blockKeys,
  blockData,
  dataPath = []
) => {
  const oldContentState = editorState.getCurrentContent();
  const newContentState = blockKeys.reduce(
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

// This functionality has been taken from draft-js and modified for re-usability purposes.
// Maps over the selected characters, and applies a function to each character.
// Characters are of type CharacterMetadata. Look up the draftJS API to see what
// operations can be performed on characters.
const mapSelectedCharacters = callback => editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockMap = contentState.getBlockMap();
  const startKey = selectionState.getStartKey();
  const startOffset = selectionState.getStartOffset();
  const endKey = selectionState.getEndKey();
  const endOffset = selectionState.getEndOffset();

  const newBlocks = blockMap.skipUntil((_, k) => {
    return k === startKey;
  }).takeUntil((_, k) => {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map((block, blockKey) => {
    let sliceStart;
    let sliceEnd;

    // sliceStart -> where the selection starts
    // endSlice -> Where the selection ends

    // Only 1 block selected
    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
      // Gets the selected characters of the block when multiple blocks are selected.
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    // Get the characters of the current block
    let chars = block.getCharacterList();
    let current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      const newChar = callback(current);
      chars = chars.set(sliceStart, newChar);
      sliceStart++;
    }

    return block.set('characterList', chars);
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });

  return EditorState.push(editorState, newContentState, 'change-inline-style');
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

const removeBlockDataForBlockKeys = (editorState, blockKeys, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const newContentState = blockKeys.reduce(
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

const fromRawContentStateToEditorState = contentState => {
  return contentState
    ? EditorState.createWithContent(convertFromRaw(contentState))
    : EditorState.createEmpty();
};

// Logs contentState in a readable format.
const contentStateLogger = editorState => {
  const result = JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 4);
  const newResult = JSON.parse(result);
  const contentState = JSON.stringify({ contentState: newResult }, null, 4);
  // unquotes object keys
  const keyQuotes = /"(.+)"(?=:)/g;
  const newContentState = contentState.replace(keyQuotes, '$1');
  console.log(newContentState);
};

export {
  changeBlockData,
  changeBlockDataForBlockKeys,
  fromRawContentStateToEditorState,
  getSelectedBlocks,
  removeBlockData,
  removeBlockDataForBlockKeys,
  getSelectedBlockKeys,
  mapSelectedCharacters,
  contentStateLogger,
};
