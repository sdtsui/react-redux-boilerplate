import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './components/App';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);
