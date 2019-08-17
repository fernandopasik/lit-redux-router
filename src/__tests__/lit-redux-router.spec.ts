import configureStore from 'redux-mock-store';
import { connectRouter, navigate } from '../lit-redux-router';

import Route from '../route';
import reducer from '../reducer';
import { navigate as navigateAction } from '../actions';

jest.mock('../route', () => jest.fn());
jest.mock('../reducer', () => jest.fn());
jest.mock('../actions', () => ({ navigate: jest.fn() }));

const mockStore = configureStore([]);

describe('lit redux router', () => {
  it('connects router to reducer', () => {
    const store = mockStore({});
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(addReducers).toHaveBeenCalledWith({ router: reducer });
  });

  it('creates the route component connected to store', () => {
    const store = mockStore({});
    const addReducers = jest.fn();
    store.addReducers = addReducers;
    connectRouter(store);
    expect(Route).toHaveBeenCalledWith(store);
  });

  it('exports a navigate action', () => {
    expect(navigate).toStrictEqual(navigateAction);
  });
});
