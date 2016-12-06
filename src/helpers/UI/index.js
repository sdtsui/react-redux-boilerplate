import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';

// TODO get the initialState from the defaultProps of the component.
const UI = (key,
            initialState,
            mapStateToProps = () => ({}),
            mapDispatchToProps = () => ({})) => ComponentClass => {

  // Set state as a defaultProp of the component class. So that it is never
  // undefined
  if (!ComponentClass.defaultProps || ComponentClass.defaultProps.state) {
    ComponentClass.defaultProps = { ...ComponentClass.defaultProps, state: {} }
  }
  // global , Will try to find a way to fix this.
  let _instanceKey = null;

  class Wrapper extends Component {
    componentWillMount() {
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

  const checkedInstanceKey = (state, instanceKey) => {
    // key has not been registered, component has no key
    if (!state.ui[key] && !instanceKey && instanceKey !== 0) {
      _instanceKey = 0;
      return;
    }
    // key has been registered, component has no key
    if (state.ui[key] && !instanceKey && instanceKey !== 0) {
      const keyArray = Object.keys(state.ui[key]);
      _instanceKey = keyArray.length;
      return;
    }
    // key has been registered and already has a key
    if (state.ui[key] && (instanceKey || intanceKey === 0)) {
      _instanceKey = instanceKey;
      return;
    }
    console.log('unhandled case');
  };

  const mergeStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps);
    const { instanceKey } = ownProps;
    // console.log('ownProps', ownProps);
    // set a new instance key if it does not have one.
    checkedInstanceKey(state, instanceKey);

    if (typeof mapStateToProps === 'function') {
      return {
        ...mapStateToProps(state),
        state: state.ui[key],
        uiKey: key,
        instanceKey: _instanceKey,
      };
    }

    return {
      state: state.ui[key],
      uiKey: key,
      instanceKey: _instanceKey,
    };
  };

  const mergeDispatchToProps = (dispatch, ownProps) => {
    // Curry the key in setState
    const setLocalState = actions.setLocalState(key)(_instanceKey);
    if (typeof mapDispatchToProps === 'function') {
      return {
        ...mapDispatchToProps(dispatch),
        ...bindActionCreators({ ...actions, setLocalState }, dispatch),
      };
    }
    return {
      ...bindActionCreators({ ...actions, setLocalState }, dispatch),
    };
  };

  return connect(mergeStateToProps, mergeDispatchToProps)(Wrapper);
};

export default UI;

// [] -> should be an array of objects.
// Key should be assigned automatically, get rid of singletons
// just use an array and keep the keys.