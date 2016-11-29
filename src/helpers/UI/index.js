import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';

const UI = (ComponentClass,
            key,
            initialState,
            stateToProps = null,
            dispatchToProps = null) => {

  class UIComponent extends Component {
    /**
     * Add the initial State here!
     */
    componentWillMount() {
      const { setLocalState } = this.props;
      setLocalState(initialState);
    }

    /**
     * Remove the data if specified
     */
    componentWillUnMount() {
      const setLocalState = this.props;
      setLocalState({});
    }

    render() {
      return <ComponentClass {...this.props}/>
    }
  }

  const mapStateToProps = state => {
    return {
      [key]: state.ui[key],
    }
  };

  const mapDispatchToProps = dispatch => {
    // Curry the key in setState
    const setLocalState = actions.setLocalState(key);
    return bindActionCreators({ ...actions, setLocalState }, dispatch);
  };

  return connect(mapStateToProps, mapDispatchToProps)(UIComponent);
};

export default UI;
