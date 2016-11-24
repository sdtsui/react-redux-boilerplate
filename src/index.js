// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import reducers from './reducer';
import thunk from 'redux-thunk'
import reduxScopeMiddleware from './middleware/redux-scope-middleware'

const middleware = [
  thunk,
  reduxScopeMiddleware
];
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
const provider = (
  <Provider store={store}>
    { routes(store) }
  </Provider>
);
ReactDOM.render(provider, document.querySelector('.container'));
