import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.ts';
import type { Store } from 'redux';
import reducer from './lib/reducer.ts';
import Route from './lib/route.ts';

export const connectRouter = (store: LazyStore & Store): void => {
  store.addReducers({ router: reducer });

  // eslint-disable-next-line new-cap
  Route(store);
};

export { navigate } from './lib/actions.js';
