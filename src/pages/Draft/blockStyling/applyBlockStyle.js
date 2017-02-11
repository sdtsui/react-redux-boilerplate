import { fromJS } from 'immutable';
import { changeBlockData, removeBlockData, getSelectedBlockKeys } from '../helpers';

const addClassNameToData = (editorState, blockStyle) => {
  return changeBlockData(editorState, fromJS({ className: blockStyle }));
};

const removeClassNameFromData = editorState => {
  return removeBlockData(editorState, ['className']);
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

const getListsFromSelection = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const isCollapsed = selection.isCollapsed();
  const getBlockType = block => block.getType();
  const getBlockKey = block => block.getKey();
  const getBlockBefore = blockKey => contentState.getBlockBefore(blockKey);
  const getBlockAfter = blockKey => contentState.getBlockAfter(blockKey);
  const isList = block => getBlockType(block) === 'unordered-list-item';
  const anchorKey = selection.getAnchorKey();
  const focusKey = selection.getFocusKey();
  const firstBlock = contentState.getBlockForKey(anchorKey);
  const lastBlock = contentState.getBlockForKey(focusKey);
  const isFirstBlockList = isList(firstBlock);
  const isLastBlockList = isList(lastBlock);
  let listBlocks = [];

  if (isFirstBlockList) {
    listBlocks.push(anchorKey); // already pushed anchorKey

    let prevBlock = getBlockBefore(anchorKey);
    while (prevBlock && isList(prevBlock)) {
      listBlocks.push(getBlockKey(prevBlock));
      prevBlock = getBlockBefore(prevBlock);
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

export {
  addClassNameToData,
  getListsFromSelection,
  removeClassNameFromData,
  toggleClassName,
  firstSelectedBlockHasTecClassName,
};
