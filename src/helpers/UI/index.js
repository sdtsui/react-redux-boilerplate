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
      const { setState } = this.props;
      setState({ [key]: initialState });
    }

    /**
     * Remove the data if specified
     */
    componentWillUnMount() {
      const setState = this.props;
      setState({ [key]: {} });
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
    return bindActionCreators({ ...actions }, dispatch);
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
};

export default UI;
