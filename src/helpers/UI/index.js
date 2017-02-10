import React, { Component } from 'react';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from './reducer';

const UI = (uiKey, initialState) => ComponentClass => {
  class Wrapper extends Component {
    componentDidMount() {
      this.props.setLocalState(initialState);
    }

    componentWillUnmount() {
      this.props.removeInstanceKey(key, this.props.instanceKey);
    }

    render() {
      return (
        <ComponentClass
          {...this.props}
        />
      );
    }
  }

  const mapStateToProps = (state, { instanceKey }) => {
    return {
      state: R.pathOr({}, ['ui', uiKey, instanceKey], state),
      uiKey,
    };
  };

  const mapDispatchToProps = (dispatch, { instanceKey }) => {
    const setLocalState = actions.setLocalState(uiKey)(instanceKey);

    return {
      ...bindActionCreators({ ...actions, setLocalState }, dispatch),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default UI;
