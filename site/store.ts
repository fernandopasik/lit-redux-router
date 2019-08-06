import { createStore, combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { lazyReducerEnhancer } from 'pwa-helpers';

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (state: any): any => state,
  composeEnhancers(lazyReducerEnhancer(combineReducers)),
);

export default store;
