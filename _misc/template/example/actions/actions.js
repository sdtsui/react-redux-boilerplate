import * as actions from '../actions/actions.js';

export const testReducer = (payload) => {
  return {
    type: actions.TEST_REDUCER,
    payload: 'ok!',
  }
};