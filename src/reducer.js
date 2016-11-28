import { combineReducers } from 'redux';
import { reducer as app } from '../src/pages/App/reducer';
import { reducer as filters } from '../src/pages/Filters/reducer';
const rootReducer = combineReducers({
    app,
    filters
  }
);

export default rootReducer;
