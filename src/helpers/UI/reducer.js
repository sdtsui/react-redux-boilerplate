import makeReducer from '../makeReducer';

//uiTypes
const uiTypes = ['SET_UI_STATE'];

// UI Actions
const uiActions = prefixedTypes => {
  // Set the ui state depending on the key
  const setLocalState = key => (payload, scope = null) => {
    return {
      type: prefixedTypes.SET_UI_STATE,
      payload,
      key: scope || key,
    };
  };
  return {
    setLocalState,
  }
};

// UI Reducer
const uiReducer = (state, action, prefixedTypes) => {
  switch (action.type) {
    case prefixedTypes.SET_UI_STATE: {
      const { key, payload } = action;
      const newState = { ...state };
      newState[key] = { ...newState[key], ...payload };
      return newState;
    }

    default: {
      return state;
    }
  }
};

const newReducer = makeReducer('UI', {}, uiReducer, uiTypes, uiActions);
export const actions = newReducer.actions;
export const reducer = newReducer.reducer;
