// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import reducers from './reducers';
import thunk from 'redux-thunk'

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);
const provider = (
  <Provider store={store}>
    { routes }
  </Provider>
);
ReactDOM.render(provider, document.querySelector('.container'));
