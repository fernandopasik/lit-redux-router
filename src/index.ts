import { Store } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';

import Router from './router';
import Route from './route';

export const connectRouter = (store: Store & LazyStore) => {
  Router(store);
  Route(store);
};
