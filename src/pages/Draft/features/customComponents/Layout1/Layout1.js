import { fromJS } from 'immutable';
import { RichUtils, EditorState, ContentState, SelectionState } from 'draft-js';
import { changeBlockDataForBlockKeys } from '../../../core';

export const addBlockData = (editorState, blockKey) =>
  data => changeBlockDataForBlockKeys(editorState, [blockKey], fromJS(data));

// move to core
export const insertNewBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const blockList = contentState.getBlockMap().toList();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();

  // get the block index where the cursor is at
  const blockIndex = blockList.findIndex(block => {
    return block.getKey() === startKey;
  });

  const firstSlice = blockMap.slice(0, blockIndex + 1);
  const lastSlice = blockMap.slice(blockIndex + 1);
  const newBlockContentState = ContentState.createFromText('');
  const newBlockContentState2 = ContentState.createFromText('');
  const spaceBlock = newBlockContentState.getBlockMap().first();
  const unstyledBlock = newBlockContentState2.getBlockMap().first();
  const selectionKey = unstyledBlock.getKey();
  const newBlocks = [spaceBlock, unstyledBlock];

  const newBlockMap = newBlocks.reduce((prevBlockMap, newBlock) => {
    const newBlockKey = newBlock.getKey();
    return prevBlockMap.set(newBlockKey, newBlock);
  }, firstSlice).concat(lastSlice);

  const newSelection = SelectionState.createEmpty().merge({
    anchorKey: selectionKey,
    focusKey: selectionKey,
    anchorOffset: 0,
    focusOffset: 0,
  });

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  });

  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState),
    newSelection
  );
};

export const addNewLine = editorState => RichUtils.insertSoftNewline(editorState);

// Creates a closure to keep the state of the times the enter key was pressed.
const listenFor = () => {
  let timesPressed = 0;

  const enterKey = (e, editorState, updateEditorState) => {
    if (e.keyCode === 13) {
      setTimeout(() => {
        if (timesPressed === 1) {
          updateEditorState(addNewLine(editorState));
        }
        if (timesPressed > 1) {
          updateEditorState(insertNewBlock(editorState));
        }
        timesPressed = 0;
      }, 250);
      timesPressed++;
    }
  };

  return {
    enterKey,
  };
};

const handle = listenFor();

export const handleEnterKey = (
  e,
  editorState,
  updateEditorState,
) => handle.enterKey(e, editorState, updateEditorState);
