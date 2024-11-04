import { describe, expect, it, jest } from '@jest/globals';
import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';
import type { Store } from 'redux';
// eslint-disable-next-line import/no-named-as-default
import configureStore from 'redux-mock-store';
import { navigate as navigateAction } from './lib/actions.js';
import reducer from './lib/reducer.js';
import Route from './lib/route.js';
import { connectRouter, navigate } from './lit-redux-router.js';

jest.mock('./lib/route', () => jest.fn());
jest.mock('./lib/reducer', () => jest.fn());
jest.mock('./lib/actions', () => ({ navigate: jest.fn() }));

const mockStore = configureStore([]);

describe('lit redux router', () => {
  it('connects router to reducer', () => {
    const store = mockStore({}) as unknown as LazyStore & Store<Record<string, unknown>>;
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);

    expect(addReducers).toHaveBeenCalledWith({ router: reducer });
  });

  it('creates the route component connected to store', () => {
    const store = mockStore({}) as unknown as LazyStore & Store<Record<string, unknown>>;
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);

    expect(Route).toHaveBeenCalledWith(store);
  });

  it('exports a navigate action', () => {
    expect(navigate).toStrictEqual(navigateAction);
  });
});
