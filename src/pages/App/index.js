import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './reducer'

class AppContainer extends Component {
  render() {
    return this.props.children;
  }
}

const mapStateToProps = ({ app, page1 }) => {
  return {
    app,
    page1,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

// default props
AppContainer.defaultProps = {};

// propTypes
AppContainer.propTypes = {};
