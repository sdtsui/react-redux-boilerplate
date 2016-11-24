/**
 * Sets the state of a redux reducer and returns a new state
 * @param state
 * @param propsToMerge
 * @returns {{propsToMerge: *}}
 */
const mergeState = (state, propsToMerge) => {
  return { ...state, ...propsToMerge };

};

/**
 * Prefixes actions
 * @param { String } prefix
 * @param { Array } unprefixedActions
 */
const prefixTypes = (unprefixedActions, prefix) => {
  const initialVal = {};
  if (!Array.isArray(unprefixedActions)) {
    return initialVal;
  }
  return unprefixedActions.reduce((prevVal, currentAction) => {
    const newAction = `${prefix}/${currentAction}`;
    return { ...prevVal, [currentAction]: newAction };
  }, initialVal);
};

/**
 *
 * @param { object } prefixedTypes
 * @param { function } actions
 * @returns {*}
 */
const prefixActions = (prefixedTypes, actions) => {
  if (typeof actions === 'function') {
    return actions(prefixedTypes);
  }
  return {};
};

/**
 * Creates a reducer and it curries the prefixed types with a callback
 * @param { object } prefixedTypes
 * @param { object } initialState
 * @param { function } callback
 */
const createReducer = (prefixedTypes, initialState, callback) => (state = initialState, action) => {
  if (action.type === prefixedTypes.SET_STATE) {
    return mergeState(state, action.payload);
  }
  if (typeof callback === 'function') {
    return callback(state, action.type, prefixedTypes);
  }
  return state;
};

/**
 * Define default types in here
 * @type {[*]}
 */
const defaultTypes = ['SET_STATE'];

/**
 * You can use the default types defined created in the defaultTypes array
 * @param { object } prefixedTypes
 * @returns {{setState: (function(*))}}
 */
const createDefaultActions = prefixedTypes => {
  const setState = (payload, scope) => {
    return {
      type: prefixedTypes.SET_STATE,
      payload,
      scope,
    };
  };

  return {
    setState,
  };
};

/**
 * Makes a re-usable function that generates a reducer. This reducer has
 * a setState action for updating the reducer locally and other reducers as
 * well.
 * @param { string }  prefix
 * @param { object } initialState
 * @param { function } reducer
 * @param { array } types
 * @param { function } actions
 * @returns {{actions: {}, types, reducer}}
 */
const makeReducer = (prefix = 'DEFAULT', initialState = {}, reducer, types = [], actions) => {
  const unprefixedTypes = [...defaultTypes, ...types];
  const prefixedTypes = prefixTypes(unprefixedTypes, prefix);
  const defaultActions = createDefaultActions(prefixedTypes);
  const prefixedActions = prefixActions(prefixedTypes, actions);
  const newReducer = createReducer(prefixedTypes, initialState, reducer);
  return {
    actions: { ...prefixedActions, ...defaultActions },
    types: prefixedTypes,
    reducer: newReducer,
  };
};

export default makeReducer;
