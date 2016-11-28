import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import Page1 from './pages/Page1';
import Todos from './pages/Todos';

/**
 * Has access to the redux store. Useful for validation purposes
 * @param store
 */
export default (store) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Todos}/>
      </Route>
    </Router>
  );
}
