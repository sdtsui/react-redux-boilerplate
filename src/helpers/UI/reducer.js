import makeReducer from '../makeReducer';
const newReducer = makeReducer('UI');
export const actions = newReducer.actions;
export const reducer = newReducer.reducer;
