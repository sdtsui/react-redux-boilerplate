import * as actions from '../constants';

export const addReducer = (name, reducerState) => {
  return {
    type: actions.ADD_REDUCER,
    payload: { name, reducerState },
  };
};
