// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const App = (props: Object) => {
  return (
    <div>
      {props.children}
      <h1>{props.appState.get('test')}</h1>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    appState: state.appReducer,
  };
};

App.propTypes = {
  appState: PropTypes.object,
};

export default connect(mapStateToProps)(App);
