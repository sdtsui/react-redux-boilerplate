import { fromJS } from 'immutable';
import { RichUtils, EditorState, ContentState, SelectionState } from 'draft-js';
import { changeBlockDataForBlockKeys } from '../../../core';

export const addBlockData = (editorState, blockKey) =>
  data => changeBlockDataForBlockKeys(editorState, [blockKey], fromJS(data));

// move to core
export const insertNewBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockList = contentState.getBlockMap().toList();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const blockIndex = blockList.findIndex(block => block.getKey() === startKey);
  const blockMap = contentState.getBlockMap();
  const firstSlice = blockMap.slice(0, blockIndex + 1);
  const lastSlice = blockMap.slice(blockIndex + 1);
  const tempBlockMap = ContentState.createFromText(';', ';').getBlockMap();
  const fistBlock = tempBlockMap.first();
  const lastBlock = tempBlockMap.last();

  // Generate the blockMap
  const newBlockMap = [fistBlock, lastBlock].reduce((prevBlockMap, newBlock) => {
    return prevBlockMap.set(newBlock.getKey(), newBlock);
  }, firstSlice).concat(lastSlice);

  // Modify selection to place cursor at new block
  const selectionKey = lastBlock.getKey();
  const newSelection = SelectionState.createEmpty().merge({
    anchorKey: selectionKey,
    focusKey: selectionKey,
    anchorOffset: 0,
    focusOffset: 0,
  });

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  });

  // Force the editor to render the cursor correctly
  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState),
    newSelection);
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
      }, 200);
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
