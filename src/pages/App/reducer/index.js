import makeReducer from '../../../helpers/redux-scope';
const newReducer = makeReducer('APP');
export const reducer = newReducer.reducer;
export const actions = newReducer.actions;
