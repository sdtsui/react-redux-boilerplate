// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const App = (props: Object) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps)(App);
