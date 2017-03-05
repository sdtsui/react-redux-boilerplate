import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const customBlockRenderMap = Map();

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);

export default extendedBlockRenderMap;
