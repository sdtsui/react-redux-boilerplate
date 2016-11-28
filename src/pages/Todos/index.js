import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Todos from './Todos';

class TodosContainer extends Component {
  render() {
    return (
      <Todos {...this.props} />
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);

// default props
TodosContainer.defaultProps = {};

// propTypes
TodosContainer.propTypes = {};
