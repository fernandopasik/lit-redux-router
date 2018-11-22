import { addRoute, navigate } from '../actions';

describe('Router Actions', () => {
  describe('Navigate', () => {
    test('has a type', () => {
      expect(navigate('')).toHaveProperty('type', 'NAVIGATE');
    });

    test('to a path', () => {
      const path = '/about';
      expect(navigate(path)).toHaveProperty('path', path);
    });
  });

  describe('Add Route', () => {
    test('has a type', () => {
      expect(addRoute('/')).toHaveProperty('type', 'ADD_ROUTE');
    });

    test('adds a path', () => {
      const path = '/about';
      expect(addRoute(path)).toHaveProperty('path', path);
    });
  });
});
