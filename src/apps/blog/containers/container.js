import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as actions from '../actions/actions';
import config from '../config/config';
import core from '../core/core';
import reducer from '../reducers/reducer';
import routes from '../routes/routes';
import '../style/styles.scss';

class Container extends Component {
  render() {
    return <Main {...this.props}/>;
  }
}

/**
 * State from the global redux store goes here
 * @param state
 */
const mapStateToProps = (state) => {
  return {
    app: state.app,
  }
};

/**
 * Actions from ./core go inhere
 * @param dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
};

export { actions, config, core, reducer, routes }
export default connect(mapStateToProps, mapDispatchToProps)(Container);
