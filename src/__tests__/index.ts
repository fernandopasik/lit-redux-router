import { connectRouter } from '../index';
import configureStore from 'redux-mock-store'

import Router from '../router';
import Route from '../route';
import reducer from '../reducer';

jest.mock('../router', () => jest.fn());
jest.mock('../route', () => jest.fn());
jest.mock('../reducer', () => jest.fn());

const mockStore = configureStore([]);

describe('Connect Router', () => {
  test('to components', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(Router).toHaveBeenCalledWith(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  test('to reducer', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(store.addReducers).toHaveBeenCalledWith({ router: reducer });
  });
});
