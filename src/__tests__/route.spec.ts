import configureStore from 'redux-mock-store';
import * as pwaHelpers from 'pwa-helpers';
import { customElement } from 'lit-element';
import connectRouter, { RouteClass as Route } from '../route';

import * as actions from '../actions';
import * as selectors from '../selectors';

jest.mock('lit-element', () => ({
  LitElement: class LitElement {},
  html: jest.fn((strings, ...values) => strings
    .map((string: string, index: number) => string + (values[index] || '')).join('')),
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('lit-html/directives/unsafe-html.js', () => ({
  unsafeHTML: jest.fn(html => html),
}));

jest.mock('pwa-helpers', () => ({
  connect: jest.fn(() => jest.fn(elem => elem)),
  installRouter: jest.fn(cb => cb),
}));

jest.mock('../actions', () => ({
  setActiveRoute: jest.fn(() => ({ type: '' })),
  addRoute: jest.fn(() => ({ type: '' })),
}));

jest.mock('../selectors', () => ({
  isRouteActive: jest.fn(() => false),
  getRouteParams: jest.fn(() => ({})),
}));

const mockStore = configureStore([]);

describe('Route element', () => {
  beforeAll(() => {
    Object.defineProperty(global, 'window', {
      value: {
        customElements: {
          define: jest.fn(),
        },
        decodeURIComponent: jest.fn(val => val),
        scrollTo: jest.fn(),
      },
    });
  });

  test('defines the custom element', () => {
    connectRouter(mockStore({}));

    expect(customElement).toHaveBeenCalledWith('lit-route');
  });

  describe('first updated', () => {
    test('installs router', () => {
      connectRouter(mockStore({}));
      const route = new Route();

      route.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    test('installs router only once', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      const route2 = new Route();

      route.firstUpdated();
      route2.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    test('registers the route if path present', () => {
      connectRouter(mockStore({}));
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      const path = '/1';
      route.path = path;

      route.firstUpdated();

      expect(spy).toHaveBeenCalledWith(path);

      spy.mockRestore();
    });

    test('does not register the route if path not present', () => {
      connectRouter(mockStore({}));
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();

      route.firstUpdated();

      expect(spy).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    test('can set active route', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      const spy1 = jest.spyOn(pwaHelpers, 'installRouter');
      const spy2 = jest.spyOn(actions, 'setActiveRoute');
      const pathname = '/example';
      const search = '?test=testing';
      const hash = '#example';

      route.firstUpdated();
      const cb = spy1.mock.results[0].value;
      cb({ pathname, search, hash });

      expect(spy2).toHaveBeenCalledWith(pathname + search + hash);

      spy1.mockRestore();
      spy2.mockRestore();
    });
  });

  describe('state changed', () => {
    test('can check if route active', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      const state = { activeRoute: '/' };
      const path = '/1';
      const spy = jest.spyOn(selectors, 'isRouteActive')
        .mockImplementationOnce(() => true);
      route.path = path;
      route.scrollDisable = true;
      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.active).toBe(true);
      expect(window.scrollTo).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    test('can get params', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      const state = {};
      const path = '/1';
      const params = { one: '1' };
      route.path = path;
      const spy = jest.spyOn(selectors, 'getRouteParams')
        .mockImplementationOnce(() => params);

      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.params).toEqual(params);

      spy.mockRestore();
    });
  });

  describe('render', () => {
    beforeAll(() => {
      connectRouter(mockStore({}));
    });

    test('if not active returns empty', () => {
      const route = new Route();
      route.active = false;

      const rendered = route.render();

      expect(rendered).toBe('');
    });

    test('with children elements', () => {
      const route = new Route();
      route.active = true;

      const rendered = route.render();

      expect(rendered).toBe('<slot></slot>');
    });

    test('with components', () => {
      const route = new Route();
      route.active = true;
      route.component = 'example';

      const rendered = route.render();

      expect(rendered).toBe('<example></example>');
    });

    test('with components with parameters', () => {
      const route = new Route();
      route.active = true;
      route.component = 'example';
      route.params = {
        one: '1',
        two: '2',
      };

      const rendered = route.render();

      expect(rendered).toBe('<example one="1" two="2"></example>');
    });

    describe('with component and scrolling', () => {
      test('disabled', () => {
        const route = new Route();
        const state = { activeRoute: '/test2' };
        route.scrollDisable = true;
        route.stateChanged(state);

        expect(window.scrollTo).not.toHaveBeenCalled();
      });
      test('default', () => {
        const route = new Route();
        const state = { activeRoute: '/' };
        const path = '/';
        route.path = path;
        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      });
      test('via scrollOpt', () => {
        const route = new Route();
        const state = { activeRoute: '/' };
        const path = '/';
        route.scrollIntoView = jest.fn();
        route.scrollOpt = { behavior: 'smooth', block: 'nearest', inline: 'nearest' };
        route.path = path;

        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(route.scrollIntoView).toHaveBeenCalledWith(route.scrollOpt);
      });
    });

    describe('with dynamic imported components without loading component', () => {
      test('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = () => import('../../demo/docs.js');
        route.path = '/';
        const state = { activeRoute: route.path };

        jest.spyOn(selectors, 'isRouteActive')
          .mockImplementationOnce(() => true);

        route.stateChanged(state);

        expect(route.isResolving).toBe(true);
        const rendered = route.render();
        expect(rendered).toBe('');
      });

      test('after resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = () => import('../../demo/docs.js');
        route.path = '/';
        const state = { activeRoute: route.path };
        const spy = jest.spyOn(route, 'stateChanged').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalled();
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
    describe('with dynamic imported components with loading component', () => {
      test('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = () => import('../../demo/docs.js');
        route.loading = 'my-loading';
        route.path = '/';

        const state = { activeRoute: route.path };

        const spy = jest.spyOn(selectors, 'isRouteActive')
          .mockImplementationOnce(() => true);

        route.stateChanged(state);

        expect(spy).toHaveBeenCalled();
        expect(route.isResolving).toBe(true);
        const rendered = route.render();
        expect(rendered).toBe('<my-loading></my-loading>');
      });

      test('after resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = () => import('../../demo/docs.js');
        route.loading = 'my-loading';
        route.path = '/';

        const state = { activeRoute: route.path };
        const spy = jest.spyOn(route, 'stateChanged').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalled();
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
  });
});
