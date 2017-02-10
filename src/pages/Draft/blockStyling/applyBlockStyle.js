import { fromJS } from 'immutable';
import { changeBlockData, removeBlockData } from '../helpers';

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

export {
  addClassNameToData,
  removeClassNameFromData,
  toggleClassName,
  firstSelectedBlockHasTecClassName,
};
