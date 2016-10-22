// @flow
import { Map } from 'immutable';
import * as constants from '../constants';
const initialState = Map({
  status: '',
});

export default (state = initialState, action) => {
  switch (action.type) {

    case constants.TEST_REDUCER : {
      return state.set('status', action.status);
    }
  }

  return state;
}
