import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import Route from './route';

import reducer from './reducer';
import { State } from './selectors';

export const connectRouter = (store: Store<State> & LazyStore) => {
  store.addReducers({ router: reducer });

  Route(store);
};

export { navigate } from './actions';
