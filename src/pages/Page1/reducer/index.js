import makeReducer from '../../../helpers/redux-scope';
const initialState = { clicks: 1 };
const newReducer = makeReducer('PAGE1', initialState);
export const reducer = newReducer.reducer;
export const actions = newReducer.actions;
