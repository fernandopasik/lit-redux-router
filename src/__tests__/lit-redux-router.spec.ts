import configureStore from 'redux-mock-store';
import { Store, AnyAction } from 'redux';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import { connectRouter, navigate } from '../lit-redux-router';

import Route from '../lib/route';
import reducer from '../lib/reducer';
import { navigate as navigateAction } from '../lib/actions';

jest.mock('../lib/route', () => jest.fn());
jest.mock('../lib/reducer', () => jest.fn());
jest.mock('../lib/actions', () => ({ navigate: jest.fn() }));

const mockStore = configureStore([]);

type TestStore = Store<Record<string, unknown>, AnyAction> & LazyStore;

describe('lit redux router', () => {
  it('connects router to reducer', () => {
    const store = (mockStore({}) as unknown) as TestStore;
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(addReducers).toHaveBeenCalledWith({ router: reducer });
  });

  it('creates the route component connected to store', () => {
    const store = (mockStore({}) as unknown) as TestStore;
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  it('exports a navigate action', () => {
    expect(navigate).toStrictEqual(navigateAction);
  });
});
