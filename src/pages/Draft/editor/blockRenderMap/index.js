import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';
import { LAYOUT } from '../../core/types/block';

const customBlockRenderMap = Map({
  [LAYOUT]: {
    element: 'div',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);

export default extendedBlockRenderMap;
