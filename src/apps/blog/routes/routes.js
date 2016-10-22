import React from 'react';
import { Route } from 'react-router';
import BlogContainer from '../containers/Container';

export const routes = (
  <Route path="blog" component={BlogContainer}/>
);
