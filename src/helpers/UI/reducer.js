import makeReducer from '../makeReducer';

// UITypes
const uiTypes = ['SET_UI_STATE', 'REMOVE_UI_KEY'];

// UI Actions
const uiActions = prefixedTypes => {
  // Set the ui state depending on the key
  const setLocalState = key => instanceKey => (payload, scope = null) => {
    return {
      type: prefixedTypes.SET_UI_STATE,
      payload,
      key: scope || key,
      instanceKey,
    };
  };

  const removeUIKey = key => {
    return {
      type: prefixedTypes.REMOVE_UI_KEY,
      key,
    }
  };

  return {
    setLocalState,
    removeUIKey,
  }
};

// UI Reducer
const uiReducer = (state, action, prefixedTypes) => {
  switch (action.type) {
    case prefixedTypes.SET_UI_STATE: {
      const { key, payload, instanceKey } = action;
      const newState = { ...state };
      // Keep an object of objects.
      if (!newState[key] && instanceKey === 0) {
        // first item in the array
        newState[key] = [];
        newState[key][0] = { ...newState[key][0], ...payload };
        return newState;
      }
      // its not the first item in the array
      if (instanceKey || instanceKey === 0) {
        newState[key][instanceKey] = { ...newState[key][instanceKey], ...payload };
        return newState;
      }
      return state;
    }

    case prefixedTypes.REMOVE_UI_KEY: {
      const { key } = action;
      const newState = { ...state };
      delete newState[key];
      return newState;
    }

    default: {
      return state;
    }
  }
};

const newReducer = makeReducer('UI', { test: [] }, uiReducer, uiTypes, uiActions);
export const actions = newReducer.actions;
export const reducer = newReducer.reducer;
