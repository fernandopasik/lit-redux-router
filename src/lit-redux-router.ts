import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';
import type { Store } from 'redux';
import reducer from './lib/reducer.js';
import Route from './lib/route.js';

export const connectRouter = (store: LazyStore & Store): void => {
  store.addReducers({ router: reducer });

  Route(store);
};

export { navigate } from './lib/actions.js';
