import { combineReducers } from 'redux';
import app from './app';
import blog from '../apps/blog/reducers/reducer';

const rootReducer = combineReducers(
  {
    app,
    blog,
  }
);

export default rootReducer;
