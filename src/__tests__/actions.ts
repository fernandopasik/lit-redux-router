import { navigate } from '../actions';

describe('Router Actions', () => {
  describe('Navigate', () => {
    test('has a type', () => {
      expect(navigate()).toHaveProperty('type', 'NAVIGATE');
    });

    test('to a path', () => {
      const path = '/about';
      expect(navigate(path)).toHaveProperty('path', path);
    });

    test('to a default path', () => {
      expect(navigate()).toHaveProperty('path', '/');
    });
  });
});
