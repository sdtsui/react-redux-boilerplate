import { fromJS } from 'immutable';
import {
  changeBlockData,
  removeBlockData,
  changeBlockDataForBlockKeys,
  removeBlockDataForBlockKeys,
} from '../helpers';

const getListsFromSelection = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const isCollapsed = selection.isCollapsed();
  const getBlockType = block => block.getType();
  const getBlockKey = block => block.getKey();
  const getBlockBefore = blockKey => contentState.getBlockBefore(blockKey);
  const getBlockAfter = blockKey => contentState.getBlockAfter(blockKey);
  const isList = block => getBlockType(block) === 'unordered-list-item';
  const anchorKey = selection.getStartKey();
  const focusKey = selection.getEndKey();
  const firstBlock = contentState.getBlockForKey(anchorKey);
  const lastBlock = contentState.getBlockForKey(focusKey);
  const isFirstBlockList = isList(firstBlock);
  const isLastBlockList = isList(lastBlock);
  let listBlocks = [];

  if (isFirstBlockList) {
    listBlocks.push(anchorKey);

    let prevBlock = getBlockBefore(anchorKey);

    while (prevBlock && isList(prevBlock)) {
      const prevBlockKey = getBlockKey(prevBlock);
      listBlocks.push(prevBlockKey);
      prevBlock = getBlockBefore(prevBlockKey);
    }
  }

  let nextBlock = getBlockAfter(anchorKey);
  while (nextBlock && !isCollapsed && (getBlockKey(nextBlock) !== focusKey)) {
    if (isList(nextBlock)) {
      listBlocks.push(getBlockKey(nextBlock));
    }
    nextBlock = getBlockAfter(nextBlock);
  }

  if (!isLastBlockList) {
    return listBlocks;
  }

  let extraBlock = isCollapsed ? getBlockAfter(focusKey) : lastBlock;
  while (extraBlock && isList(extraBlock)) {
    listBlocks.push(getBlockKey(extraBlock));
    extraBlock = getBlockAfter(getBlockKey(extraBlock));
  }

  return listBlocks;
};

const addClassNameToData = (editorState, blockStyle) => {
  const blockData = fromJS({ className: blockStyle });
  const blockKeys = getListsFromSelection(editorState);
  return changeBlockDataForBlockKeys(
    changeBlockData(editorState, blockData), blockKeys, blockData);
};

const removeClassNameFromData = editorState => {
  const pathName = ['className'];
  const blockKeys = getListsFromSelection(editorState);
  return removeBlockDataForBlockKeys(
    removeBlockData(editorState, pathName), blockKeys, pathName);
};

const getFirstBlockClassName = editorState => {
  const startKey = editorState.getSelection().getStartKey();
  const firstBlockData = editorState
    .getCurrentContent()
    .getBlockForKey(startKey)
    .getData();

  return firstBlockData.has('className')
    ? firstBlockData.get('className')
    : '';
};

const fistBlockHasClassName = className => editorState => {
  return getFirstBlockClassName(editorState) === className;
};

const firstSelectedBlockHasTecClassName = fistBlockHasClassName('tec');

const toggleClassName = (editorState, blockStyle) => {
  return firstSelectedBlockHasTecClassName(editorState)
    ? removeClassNameFromData(editorState, blockStyle)
    : addClassNameToData(editorState, blockStyle);
};

export {
  addClassNameToData,
  getListsFromSelection,
  removeClassNameFromData,
  toggleClassName,
  firstSelectedBlockHasTecClassName,
};
