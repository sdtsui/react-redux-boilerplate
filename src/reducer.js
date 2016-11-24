import { combineReducers } from 'redux';
import { reducer as app } from '../src/pages/App/reducer';
import { reducer as page1 } from '../src/pages/Page1/reducer';
const rootReducer = combineReducers({
    app,
    page1
  }
);

export default rootReducer;
