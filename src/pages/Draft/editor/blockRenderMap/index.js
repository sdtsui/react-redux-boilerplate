// Note this file does nothing for now it's just here so I don't have to
// redo this in the future
import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const customBlockRenderMap = Map();

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRenderMap);

export default extendedBlockRenderMap;
