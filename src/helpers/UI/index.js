import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';

/**
 * Taken from draft-js
 * @returns {*}
 */
function generateRandomKey() {
  const seenKeys = {};
  const MULTIPLIER = Math.pow(2, 24);

  let key = void 0;
  while (key === undefined || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  seenKeys[key] = true;
  return key;
}

// TODO get the initialState from the defaultProps of the component.
const UI = (key,
            initialState,
            mapStateToProps = () => ({}),
            mapDispatchToProps = () => ({})) => ComponentClass => {

  // Set state as a defaultProp of the component class. So that it is never
  // undefined
  ComponentClass.defaultProps = { ...ComponentClass.defaultProps, state: {} };

  class Wrapper extends Component {
    constructor() {
      super();
    }

    componentWillMount() {
      // set the initial state for the component
      const { setLocalState } = this.props;
      setLocalState(initialState);
    }

    /**
     * Remove the data if specified
     */
    componentWillUnmount() {
      const { removeUIKey, uiKey } = this.props;
      removeUIKey(uiKey);
    }

    render() {
      return <ComponentClass {...this.props}/>;
    }
  }

  const mergeStateToProps = (state, ownProps) => {
    if (typeof mapStateToProps === 'function') {
      return {
        ...mapStateToProps(state),
        state: state.ui[key],
        uiKey: key,
      };
    }

    return {
      state: state.ui[key],
      uiKey: key,
    };
  };

  const mergeDispatchToProps = (dispatch, ownProps) => {
    // Curry the key in setState
    const setLocalState = actions.setLocalState(key);
    if (typeof mapDispatchToProps === 'function') {
      return {
        ...bindActionCreators({ ...actions, setLocalState }, dispatch),
        ...mapDispatchToProps(dispatch),
      };
    }
    return {
      ...bindActionCreators({ ...actions, setLocalState }, dispatch),
    };
  };

  return connect(mergeStateToProps, mergeDispatchToProps)(Wrapper);
};

export default UI;
