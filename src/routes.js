import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import { routes as blogRoutes } from './apps/blog/routes/routes';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {blogRoutes}
    </Route>
  </Router>
);
