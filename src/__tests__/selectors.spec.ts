import {
  getRouteParams,
  getRoute,
  isRouteActive,
  noRouteActive,
} from '../selectors';

describe('Router Selectors', () => {
  describe('get route', () => {
    test('return empty object when not present', () => {
      const path = '/about';
      const route = { active: true, params: { id: '1' } };
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            [path]: route,
          },
        },
      };
      expect(getRoute(state, path)).toEqual(route);
    });

    test('return route object', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(getRoute(state, '/about')).toEqual({});
    });
  });

  describe('no route active', () => {
    test('when no routes present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(noRouteActive(state)).toEqual(true);
    });

    test('when no route active present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/contact': { active: false },
            '/about': { active: false },
          },
        },
      };
      expect(noRouteActive(state)).toEqual(true);
    });

    test('when route active present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/': { active: true },
            '/about': { active: false },
          },
        },
      };
      expect(noRouteActive(state)).toEqual(false);
    });
  });

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

    test('can be true if called with empty path and no route is active', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/contact': { active: false },
            '/about': { active: false },
          },
        },
      };
      expect(isRouteActive(state)).toEqual(true);
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

  describe('get params', () => {
    test('return empty object when route not present', () => {
      const path = '/about';
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(getRouteParams(state, path)).toEqual({});
    });

    test('return params object', () => {
      const path = '/about';
      const route = { active: true, params: { id: '1' } };
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            [path]: route,
          },
        },
      };
      expect(getRouteParams(state, path)).toEqual(route.params);
    });
  });
});
