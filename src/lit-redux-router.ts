import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import { Store } from 'redux';
import reducer from './lib/reducer';
import Route from './lib/route';

export const connectRouter = (store: Readonly<Store & LazyStore>): void => {
  store.addReducers({ router: reducer });

  Route(store);
};

export { navigate } from './lib/actions';
