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
    const newState = reducer(undefined, action);
    expect(newState).toHaveProperty('activeRoute', path);
  });

  test('when navigate to path checks for active path', () => {
    const path = '/contact';
    const routes = {
      '/home': { active: false, params: {} },
      '/contact': { active: false, params: {} },
      '/about': { active: false, params: {} },
    };
    const action = { type: 'NAVIGATE', path };
    const newState = reducer({ activeRoute: '/', routes }, action);
    expect(newState.routes[path]).toHaveProperty('active', true);
  });

  test('can add a path', () => {
    const path = '/contact';
    const action = { type: 'ADD_ROUTE', path };
    const newState = reducer(undefined, action);
    expect(newState.routes).toHaveProperty(path);
  });
});
