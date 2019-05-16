import configureStore from 'redux-mock-store';
import { connectRouter, navigate } from '../lit-redux-router';

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
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(addReducers).toHaveBeenCalledWith({ router: reducer });
  });

  test('creates the route component connected to store', () => {
    const store = mockStore({});
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  test('exports a navigate action', () => {
    expect(navigate).toStrictEqual(navigateAction);
  });
});
