import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from './reducer'
import Page1 from './Page1';

class Page1Container extends Component {
  render() {
    return <Page1 {...this.props}/>;
  }
}

const mapStateToProps = ({ page1 }) => {
  return {
    page1,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...actions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Page1Container);

// default props
Page1Container.defaultProps = {};

// propTypes
Page1Container.propTypes = {};
