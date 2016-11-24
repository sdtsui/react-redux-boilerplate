/**
 * Matches the forward slash and removes it. from the prefixed type
 * @param type
 */
const unprefixType = type => {
  const regex = /.+\//;
  return type.replace(regex, '');
};

/**
 * Prefixes an type
 * @param { String } typeScopePrefix
 * @param { String } type
 */
const prefixType = (typeScopePrefix, type) => {
  return `${typeScopePrefix}/${type}`;
};

/**
 * This middleware allows you to change the scope of an action. By default
 * you have access to a SET_STATE action. This SET_STATE action is scoped
 * locally to one reducer. A created action type will look like so
 * MY_APP/SET_STATE. What this middleware does is it takes MY_APP off and
 * prefixes the action with the desired scope. This in turn dispatches a new
 * action with the prefixed type  ex. MY_PREFIXED_ACTION/SET_STATE thus
 * allowing you to reach into other reducers by using the same function.
 */
export const reduxScopeMiddleware = ({ dispatch }) => {
  return next => action => {
    console.log('action.type', action);
    if (action.scope) {
      console.log('action.scope', action.scope);
      const unprefixedType = unprefixType(action.type);
      const prefixedType = prefixType(action.scope, unprefixedType);
      const actionCopy = { ...action };
      delete actionCopy.scope;
      actionCopy.type = prefixedType;
      return dispatch(actionCopy);
    }
    return next(action);
  };
};

export default reduxScopeMiddleware;
