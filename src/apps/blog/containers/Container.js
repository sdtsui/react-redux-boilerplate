import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as actions from '../actions/actions';
import config from '../config/config';
import core from '../core/core';
import '../style/styles.scss';

class Container extends Component {
  render() {
    return (
      <div>
        <Main {...this.props}/>
      </div>
    );
  }
}

/**
 * State from the global redux store goes here
 * @param state
 */
const mapStateToProps = state => {
  return {
    app: state,
    test: 'test',
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

export { actions, config, core }
export default connect(mapStateToProps, mapDispatchToProps)(Container);
