import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import App from './App';
import { routes as galleryRoutes } from '../src/apps/gallery/containers/container';
import { routes as blogRoutes } from '../src/apps/blog/containers/container';
import { routes as videoRoutes } from '../src/apps/videos/containers/container';
import { routes as scoreRoutes } from '../src/apps/scores/containers/container';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      {galleryRoutes}
      {blogRoutes}
      {videoRoutes}
      {scoreRoutes}
    </Route>
  </Router>
);
