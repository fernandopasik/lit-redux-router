import { getRoute, getRouteParams, isRouteActive, noRouteActive } from '../selectors';

describe('router selectors', () => {
  describe('get route', () => {
    it('return empty object when not present', () => {
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
      expect(getRoute(state, path)).toStrictEqual(route);
    });

    it('return route object', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(getRoute(state, '/about')).toStrictEqual({});
    });
  });

  describe('no route active', () => {
    it('when no routes present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(noRouteActive(state)).toBe(true);
    });

    it('when no route active present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/contact': { active: false },
            '/about': { active: false },
          },
        },
      };
      expect(noRouteActive(state)).toBe(true);
    });

    it('when route active present', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/': { active: true },
            '/about': { active: false },
          },
        },
      };
      expect(noRouteActive(state)).toBe(false);
    });
  });

  describe('is active', () => {
    it('can be true', () => {
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

    it('can be true if called with empty path and no route is active', () => {
      const state = {
        router: {
          activeRoute: '/',
          routes: {
            '/contact': { active: false },
            '/about': { active: false },
          },
        },
      };
      expect(isRouteActive(state)).toBe(true);
    });

    it('can be false', () => {
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

    it('is false if route not present', () => {
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
    it('return empty object when route not present', () => {
      const path = '/about';
      const state = {
        router: {
          activeRoute: '/',
          routes: {},
        },
      };
      expect(getRouteParams(state, path)).toStrictEqual({});
    });

    it('return params object', () => {
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
      expect(getRouteParams(state, path)).toStrictEqual(route.params);
    });
  });
});
