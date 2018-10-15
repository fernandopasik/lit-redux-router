import { isRouteActive } from '../selectors';

describe('Router Selectors', () => {
  describe('is active', () => {
    test('can be true', () => {
      const path = '/about';
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            [path]: {
              active: true,
            },
          },
        },
      };
      expect(isRouteActive(state, path)).toBe(true);
    });

    test('can be false', () => {
      const path = '/about';
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            [path]: {
              active: false,
            },
          },
        },
      };
      expect(isRouteActive(state, path)).toBe(false);
    });

    test('is false if route not present', () => {
      const path = '/about';
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(isRouteActive(state, path)).toBe(false);
    });
  });
});
