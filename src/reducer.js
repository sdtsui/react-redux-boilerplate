import { combineReducers } from 'redux';
import { reducer as app } from '../src/pages/App/reducer';
import { reducer as ui } from './helpers/UI/reducer';

const rootReducer = combineReducers(
  {
    app,
    ui,
  }
);

export default rootReducer;
