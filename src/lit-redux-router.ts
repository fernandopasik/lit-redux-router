import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';

import Route from './lib/route';
import reducer from './lib/reducer';

export const connectRouter = (store: Store & LazyStore): void => {
  store.addReducers({ router: reducer });

  Route(store);
};

export { navigate } from './lib/actions';
