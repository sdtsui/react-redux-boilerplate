import { fromJS } from 'immutable';
import { changeBlockDataForBlockKeys } from '../../../core';

export const addBlockData = (editorState, blockKey) =>
  data => changeBlockDataForBlockKeys(editorState, [blockKey], fromJS(data));
