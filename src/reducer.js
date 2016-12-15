import { combineReducers } from 'redux';
import { reducer as app } from '../src/pages/App/reducer';
const rootReducer = combineReducers({
    app,
  }
);

export default rootReducer;
