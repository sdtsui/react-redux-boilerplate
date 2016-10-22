import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Component1 from '../components/Component1';

const routes = (
  <Route path="blog" component={Main}>
    <IndexRoute component={Component1}/>
  </Route>
);
export default routes;
