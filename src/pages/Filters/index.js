import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Filters from './Filters';
import './styles/index.scss';
import { actions } from './reducer';

class FiltersContainer extends Component {
  render() {
    return (
      <Filters {...this.props} />
    );
  }
}

const mapStateToProps = ({ filters }) => {
  return {
    filters,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersContainer);

// default props
FiltersContainer.defaultProps = {};

// propTypes
FiltersContainer.propTypes = {};
