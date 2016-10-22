import { combineReducers } from 'redux';
import app from './app';
import { reducer as gallery } from '../../src/apps/gallery/containers/container';

const rootReducer = combineReducers({
  app,
  gallery,
});

export default rootReducer;
