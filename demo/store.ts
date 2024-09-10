import { lazyReducerEnhancer } from 'pwa-helpers';
import { combineReducers, compose, createStore } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

// eslint-disable-next-line @typescript-eslint/no-deprecated
const store = createStore(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
  (state: any): any => state,
  composeEnhancers(lazyReducerEnhancer(combineReducers)),
);

export default store;
