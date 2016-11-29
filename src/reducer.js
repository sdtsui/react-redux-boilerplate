import { combineReducers } from 'redux';
import { reducer as app } from '../src/pages/App/reducer';
import { reducer as filters } from '../src/pages/Filters/reducer';
import { reducer as ui } from './helpers/UI/reducer';
const rootReducer = combineReducers({
    app,
    filters,
    ui,
  }
);

export default rootReducer;
