import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from './pages/App';
import Filters from './pages/Filters';

/**
 * Has access to the redux store. Useful for validation purposes
 * @param store
 */
export default (store) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Filters}/>
      </Route>
    </Router>
  );
}
