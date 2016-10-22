// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import reducers from './reducers';

const createStoreWithMiddleware: Function = applyMiddleware()(createStore);
const provider = (
  <Provider store={createStoreWithMiddleware(reducers)}>
    { routes }
  </Provider>
);
ReactDOM.render(provider, document.querySelector('.container'));
