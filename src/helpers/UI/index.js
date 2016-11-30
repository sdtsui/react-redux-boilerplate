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

const UI = (_key,
            initialState,
            mapStateToProps = () => ({}),
            mapDispatchToProps = () => ({}),
            persist = false) => ComponentClass => {
  const key = _key ? _key : generateRandomKey();

  class Wrapper extends Component {
    constructor() {
      super();
    }

    /**
     * Add the initial State here!
     */
    componentWillMount() {
      if (this.props.state) {
        return;
      }
      const { setLocalState } = this.props;
      setLocalState(initialState);
    }

    /**
     * Remove the data if specified
     */
    componentWillUnmount() {
      if (persist) {
        return;
      }
      const { removeUIKey } = this.props;
      removeUIKey(key);
    }

    render() {
      return <ComponentClass {...this.props} />;
    }
  }

  const mergeStateToProps = state => {
    if (typeof mapStateToProps === 'function') {
      return {
        ...mapStateToProps(state),
        state: state.ui[key],
      };
    }

    return {
      state: state.ui[key],
    };
  };

  const mergeDispatchToProps = dispatch => {
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
