import { addRoute, navigate, setActiveRoute } from '../actions.js';
import { checkNavigation } from '../service.js';

jest.mock('../service', () => ({
  checkNavigation: jest.fn(),
}));

describe('router actions', () => {
  describe('add route', () => {
    it('has a type', () => {
      expect(addRoute('/')).toHaveProperty('type', 'ADD_ROUTE');
    });

    it('adds a path', () => {
      const path = '/about';
      expect(addRoute(path)).toHaveProperty('path', path);
    });
  });

  describe('navigate to route', () => {
    it('has a type', () => {
      expect(navigate('')).toHaveProperty('type', 'NAVIGATE');
    });

    it('to a path', () => {
      const path = '/about';
      expect(navigate(path)).toHaveProperty('path', path);
    });

    it('call check navigation service', () => {
      const path = '/about';
      navigate(path);
      expect(checkNavigation).toHaveBeenCalledWith(path);
    });
  });

  describe('set active route', () => {
    it('has a type', () => {
      expect(setActiveRoute('')).toHaveProperty('type', 'SET_ACTIVE_ROUTE');
    });

    it('to a path', () => {
      const path = '/about';
      expect(setActiveRoute(path)).toHaveProperty('path', path);
    });
  });
});
