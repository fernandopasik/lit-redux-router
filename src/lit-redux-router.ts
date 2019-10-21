import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';

import Route from './route';
import reducer from './reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectRouter = (store: Store & LazyStore): void => {
  store.addReducers({ router: reducer });

  Route(store);
};

export { navigate } from './actions';
