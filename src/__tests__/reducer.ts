import reducer from '../reducer';

describe('Router Reducer', () => {
  test('returns default state', () => {
    const state = { activeRoute: '/about', routes: {} };
    expect(reducer(state)).toEqual(state);
  });

  test('has a initial state for active route', () => {
    expect(reducer()).toHaveProperty('activeRoute', '/');
  });

  test('has a initial state for routes', () => {
    expect(reducer()).toHaveProperty('routes', {});
  });

  test('can navigate to another path', () => {
    const path = '/contact';
    const action = { type: 'NAVIGATE', path };
    expect(reducer(undefined, action)).toHaveProperty('activeRoute', path);
  });

  test('can add a path', () => {
    const path = '/contact';
    const action = { type: 'ADD_ROUTE', path };
    expect(reducer(undefined, action)).toHaveProperty('routes', { [path]: {} });
  });
});
