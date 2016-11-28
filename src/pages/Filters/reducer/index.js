import makeReducer from '../../../helpers/redux-scope';
const initialState = {
  blur: '0px',
  brightness: '100%',
  contrast: '100%',
  // dropShadow: 1,
  grayScale: '0%',
  hueRotate: '0deg',
  invert: '0%',
  opacity: '100%',
  saturate: '100%',
  sepia: '0%',
  // url: undefined,
};
const newReducer = makeReducer('Filters', initialState);
export const reducer = newReducer.reducer;
export const actions = newReducer.actions;
