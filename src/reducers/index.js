import { combineReducers } from 'redux';
import app from './app';
import { reducer as gallery } from '../../src/apps/gallery/containers/container';
import { reducer as blog } from '../../src/apps/blog/containers/container';
import { reducer as videos } from '../../src/apps/blog/containers/container';
import { reducer as scores } from '../../src/apps/scores/containers/container';

const rootReducer = combineReducers(
  {
    app,
    gallery,
    blog,
    videos,
    scores
  }
);

export default rootReducer;
