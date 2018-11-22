import configureStore from 'redux-mock-store';
import { connectRouter } from '../index';

import Route from '../route';
import reducer from '../reducer';

jest.mock('../route', () => jest.fn());
jest.mock('../reducer', () => jest.fn());

const mockStore = configureStore([]);

describe('Connect Router', () => {
  test('to components', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  test('to reducer', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(store.addReducers).toHaveBeenCalledWith({ router: reducer });
  });
});
