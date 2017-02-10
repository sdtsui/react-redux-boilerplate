import makeReducer from '../makeReducer';

// UITypes
const uiTypes = ['SET_UI_STATE', 'REMOVE_UI_KEY', 'REMOVE_INSTANCE_KEY'];

// UI Actions
const uiActions = (prefixedTypes) => {
  // Set the ui state depending on the key
  const setLocalState = (key) => (instanceKey) => (payload) => {
    return {
      type: prefixedTypes.SET_UI_STATE,
      payload,
      key,
      instanceKey,
    };
  };

  const removeUIKey = (key) => {
    return {
      type: prefixedTypes.REMOVE_UI_KEY,
      key,
    };
  };

  const removeInstanceKey = (key, instanceKey) => {
    return {
      type: prefixedTypes.REMOVE_INSTANCE_KEY,
      key,
      instanceKey,
    };
  };

  return {
    setLocalState,
    removeUIKey,
    removeInstanceKey
  };
};

// UI Reducer
const uiReducer = (state, action, prefixedTypes) => {
  switch (action.type) {
    case prefixedTypes.SET_UI_STATE: {
      const { key, payload, instanceKey } = action;
      const newState = { ...state };
      // Keep an object of objects.
      if (!newState[key]) {
        // first item in the array
        newState[key] = [];
        newState[key][0] = { ...payload };
        return newState;
      }
      // its not the first item in the array
      if (instanceKey || instanceKey === 0) {
        newState[key][instanceKey] = { ...payload };
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

    case prefixedTypes.REMOVE_INSTANCE_KEY: {
      const { key, instanceKey } = action;
      const newState = { ...state };
      delete newState[key][instanceKey];
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
