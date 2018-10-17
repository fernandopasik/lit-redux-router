import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import Route from './route';

import reducer, { State } from './reducer';

export const connectRouter = (store: Store<State> & LazyStore) => {
  store.addReducers({ router: reducer });

  Route(store);
};
