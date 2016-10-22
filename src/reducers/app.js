// @flow
import { Map } from 'immutable';

const initialState = Map({
  test: 'Hello',
});

export default (state: Map<string, *> = initialState, action: Object) => {
  switch (action.type) {

    case 'type': {
      return state;
    }

    default: {
      return state;
    }
  }
};

