import { createStore, combineReducers, compose } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;

const store = createStore(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (state: any): any => state,
  composeEnhancers(lazyReducerEnhancer(combineReducers)),
);

export default store;
