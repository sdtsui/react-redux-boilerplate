import makeReducer from '../../../helpers/makeReducer';

const initialState = { clicks: 1 };
const newReducer = makeReducer('APP', initialState);
export const reducer = newReducer.reducer;
export const actions = newReducer.actions;
