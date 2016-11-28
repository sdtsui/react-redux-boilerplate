import makeReducer from '../../../helpers/redux-scope';
const initialState = { clicks: 1 };
const newReducer = makeReducer('TODO', initialState);
export const reducer = newReducer.reducer;
export const actions = newReducer.actions;
