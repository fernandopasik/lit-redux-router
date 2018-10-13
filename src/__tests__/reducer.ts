import reducer from '../reducer';

describe('Router Reducer', () => {
  test('returns default state', () => {
    const state = { path: '/about' };
    expect(reducer(state)).toEqual(state);
  });
});
