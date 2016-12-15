import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';
import hoistNonReactStatic from 'hoist-non-react-statics'

// TODO get the initialState from the defaultProps of the component.
const UI = (key,
            initialState,
            mapStateToProps = () => ({}),
            mapDispatchToProps = () => ({})) => ComponentClass => {

  // Need Access to the state before react goes to do it's thing
  const InstanceComponent = (props, context) => {
    console.log('context', context);

    const checkedInstanceKey = state => {
      // key has not been registered, component has no key
      if (!state.ui[key]) {
        return 0;
      }
      // key has been registered, component has no key
      if (state.ui[key]) {
        const keyArray = Object.keys(state.ui[key]);
        return keyArray.length;
      }
    };

    InstanceComponent.contextTypes = {
      store: PropTypes.object,
    };

    const instanceKey = checkedInstanceKey(context.store);
    return <ComponentClass instanceKey={instanceKey}{...props}/>;
  };

  class Wrapper extends Component {

    static instanceKey = null;

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
      return <InstanceComponent {...this.props}/>;
    }
  }

  const mergeStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps);
    if (typeof mapStateToProps === 'function') {
      return {
        ...mapStateToProps(state),
        state: state.ui[key],
        uiKey: key,
        instanceKey: 0,
      };
    }

    return {
      state: state.ui[key],
      uiKey: key,
      instanceKey: 0
    };
  };

  const mergeDispatchToProps = (dispatch, ownProps) => {
    // Curry the key in setState
    const setLocalState = actions.setLocalState(key)(0);
    if (typeof mapDispatchToProps === 'function') {
      return {
        ...mapDispatchToProps(dispatch),
        ...bindActionCreators({
          ...actions,
          setLocalState,
        }, dispatch),
      };
    }
    return {
      ...bindActionCreators({ ...actions, setLocalState }, dispatch),
    };
  };

  return connect(mergeStateToProps, mergeDispatchToProps, null)(hoistNonReactStatic(Wrapper, ComponentClass));
};

export default UI;

// [] -> should be an array of objects.
// Key should be assigned automatically, get rid of singletons
// just use an array and keep the keys.