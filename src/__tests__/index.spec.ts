import configureStore from 'redux-mock-store';
import { connectRouter, navigate } from '../index';

import Route from '../route';
import reducer from '../reducer';
import { navigate as navigateAction } from '../actions';

jest.mock('../route', () => jest.fn());
jest.mock('../reducer', () => jest.fn());
jest.mock('../actions', () => ({ navigate: jest.fn() }));

const mockStore = configureStore([]);

describe('Lit Redux Router', () => {
  test('connects router to reducer', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(store.addReducers).toHaveBeenCalledWith({ router: reducer });
  });

  test('creates the route component connected to store', () => {
    const store = mockStore({});
    store.addReducers = jest.fn();
    connectRouter(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  test('exports a navigate action', () => {
    expect(navigate).toStrictEqual(navigateAction);
  });
});
