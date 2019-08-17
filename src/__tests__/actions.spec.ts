import { addRoute, navigate, setActiveRoute } from '../actions';
import { checkNavigation } from '../service';

jest.mock('../service', () => ({
  checkNavigation: jest.fn(),
}));

describe('Router Actions', () => {
  describe('Add Route', () => {
    it('has a type', () => {
      expect(addRoute('/')).toHaveProperty('type', 'ADD_ROUTE');
    });

    it('adds a path', () => {
      const path = '/about';
      expect(addRoute(path)).toHaveProperty('path', path);
    });
  });

  describe('Navigate to Route', () => {
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

  describe('Set Active Route', () => {
    it('has a type', () => {
      expect(setActiveRoute('')).toHaveProperty('type', 'SET_ACTIVE_ROUTE');
    });

    it('to a path', () => {
      const path = '/about';
      expect(setActiveRoute(path)).toHaveProperty('path', path);
    });
  });
});
