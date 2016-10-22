// @flow
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const App = (props: Object) => {
  return (
    <div>
      <h1>Hello</h1>
      <h1>{props.app.get('test')}</h1>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

App.propTypes = {
  app: PropTypes.object,
};

export default connect(mapStateToProps)(App);
