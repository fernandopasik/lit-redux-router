import reducer from '../reducer';

describe('Router Reducer', () => {
  test('returns default state', () => {
    const state = { activeRoute: '/about' };
    expect(reducer(state)).toEqual(state);
  });

  test('has a initial state', () => {
    expect(reducer()).toEqual({
      activeRoute: '/',
    });
  });

  test('can navigate to another path', () => {
    const path = '/contact';
    const action = { type: 'NAVIGATE', path };
    expect(reducer(undefined, action)).toHaveProperty('activeRoute', path);
  });
});
