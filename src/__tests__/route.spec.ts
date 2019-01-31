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

      route.firstUpdated();

      const cb = spy1.mock.results[0].value;
      cb({ pathname });

      expect(spy2).toHaveBeenCalledWith(pathname);

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
      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.active).toBe(true);

      spy.mockRestore();
    });

    test('can get params', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      const state = {};
      const path = '/1';
      const params = { one: '1' };
      const spy = jest.spyOn(selectors, 'getRouteParams')
        .mockImplementationOnce(() => params);
      route.path = path;
      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.params).toEqual(params);

      spy.mockRestore();
    });
  });

  describe('render', () => {
    test('if not active returns empty', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      route.active = false;

      const rendered = route.render();

      expect(rendered).toBe('');
    });

    test('with children elements', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      route.active = true;

      const rendered = route.render();

      expect(rendered).toBe('<slot></slot>');
    });

    test('with components', () => {
      connectRouter(mockStore({}));
      const route = new Route();
      route.active = true;
      route.component = 'example';

      const rendered = route.render();

      expect(rendered).toBe('<example></example>');
    });

    test('with components with parameters', () => {
      connectRouter(mockStore({}));
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
  });
});
