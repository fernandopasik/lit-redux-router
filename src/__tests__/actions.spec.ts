import { addRoute, setActiveRoute } from '../actions';

describe('Router Actions', () => {
  describe('Set Active Route', () => {
    test('has a type', () => {
      expect(setActiveRoute('')).toHaveProperty('type', 'SET_ACTIVE_ROUTE');
    });

    test('to a path', () => {
      const path = '/about';
      expect(setActiveRoute(path)).toHaveProperty('path', path);
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
