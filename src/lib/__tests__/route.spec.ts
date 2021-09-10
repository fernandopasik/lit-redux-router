/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import { customElement } from 'lit/decorators.js';
import * as pwaHelpers from 'pwa-helpers';
import type { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer.js';
import type { Store } from 'redux';
import configureStore from 'redux-mock-store';
import * as actions from '../actions.js';
import connectRouter, { RouteClass as Route } from '../route.js';
import * as selectors from '../selectors.js';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type TestStore = LazyStore & Store<Record<string, unknown>>;

jest.mock('lit', () => ({
  LitElement: class LitElement {
    public querySelector(): null {
      return null;
    }
  },
  html: jest.fn((strings: readonly string[], ...values: readonly unknown[]) =>
    strings
      .map((string: string, index: number) => `${string}${String(values[index] ?? '')}`)
      .join(''),
  ),
}));

jest.mock('lit/decorators.js', () => ({
  customElement: jest.fn(),
  property: jest.fn(),
  state: jest.fn(),
}));

jest.mock('lit/directives/unsafe-html.js', () => ({
  unsafeHTML: jest.fn((html) => html),
}));

jest.mock('pwa-helpers', () => ({
  connect: jest.fn(() => jest.fn((elem) => elem)),
  installRouter: jest.fn((cb) => cb),
}));

jest.mock('../selectors', () => ({
  isRouteActive: jest.fn(() => false),
  getRouteParams: jest.fn(() => ({})),
}));

const mockStore = configureStore([]);

describe('route element', () => {
  const customElementsGet = jest.fn();

  beforeAll(() => {
    Object.defineProperty(global, 'window', {
      value: {
        customElements: {
          define: jest.fn(),
          get: customElementsGet,
        },
        decodeURIComponent: jest.fn((val) => val),
        scrollTo: jest.fn(),
      },
    });
  });

  beforeEach(() => {
    customElementsGet.mockClear();
    (pwaHelpers.installRouter as jest.MockedFunction<typeof pwaHelpers.installRouter>).mockClear();
  });

  it('defines the custom element', () => {
    connectRouter(mockStore({}) as unknown as TestStore);

    expect(customElement).toHaveBeenCalledWith('lit-route');
  });

  describe('first updated', () => {
    it('installs router', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const route = new Route();

      await route.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    it('installs router only once', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const route = new Route();
      const route2 = new Route();

      await route.firstUpdated();
      await route2.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    it('registers the route if path present', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      const path = '/1';
      route.path = path;

      await route.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(path);

      spy.mockRestore();
    });

    it('does not register the route if path not present', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();

      await route.firstUpdated();

      expect(spy).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it('can set active route', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const route = new Route();
      const spy1 = jest.spyOn(pwaHelpers, 'installRouter');
      const spy2 = jest.spyOn(actions, 'setActiveRoute');
      const pathname = '/example';
      const search = '?test=testing';
      const hash = '#example';

      await route.firstUpdated();
      const cb = spy1.mock.results[0].value;
      cb({ pathname, search, hash });

      expect(spy2).toHaveBeenCalledWith(pathname + search + hash);

      spy1.mockRestore();
      spy2.mockRestore();
    });
  });

  describe('state changed', () => {
    it('can check if route active', () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const route = new Route();
      const state = { activeRoute: '/' };
      const path = '/1';
      const spy = jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
      route.path = path;
      route.scrollDisable = true;
      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.active).toBe(true);
      expect(window.scrollTo).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('can get params', () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const route = new Route();
      const state = {};
      const path = '/1';
      const params = { one: '1' };
      route.path = path;
      const spy = jest.spyOn(selectors, 'getRouteParams').mockImplementationOnce(() => params);

      route.stateChanged(state);

      expect(spy).toHaveBeenCalledWith(state, path);
      expect(route.params).toStrictEqual(params);

      spy.mockRestore();
    });
  });

  describe('render', () => {
    beforeAll(() => {
      connectRouter(mockStore({}) as unknown as TestStore);
    });

    it('if not active returns empty', () => {
      const route = new Route();
      route.active = false;

      const rendered = route.render();

      expect(rendered).toBe('');
    });

    it('with children elements', () => {
      const route = new Route();
      route.active = true;

      const rendered = route.render();

      expect(rendered).toBe('<slot></slot>');
    });

    it('with components', () => {
      const route = new Route();
      route.active = true;
      route.component = 'example';

      const rendered = route.render();

      expect(rendered).toBe('<example></example>');
    });

    it('with components with parameters', () => {
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
      it('disabled', () => {
        const route = new Route();
        const state = { activeRoute: '/test2' };
        route.scrollDisable = true;
        route.stateChanged(state);

        expect(window.scrollTo).not.toHaveBeenCalled();
      });

      it('default', () => {
        const route = new Route();
        const state = { activeRoute: '/' };
        const path = '/';
        route.path = path;
        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      });

      it('via scrollOpt', () => {
        const route = new Route();
        const state = { activeRoute: '/' };
        const path = '/';
        const scrollIntoView = jest.fn();
        route.scrollIntoView = scrollIntoView;
        route.scrollOpt = { behavior: 'smooth', block: 'nearest', inline: 'nearest' };
        route.path = path;

        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(scrollIntoView).toHaveBeenCalledWith(route.scrollOpt);
      });
    });

    describe('with dynamic imported components without loading component', () => {
      const importFile = async (): Promise<unknown> => import('../../lit-redux-router.js');

      it('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.path = '/';
        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue(undefined);

        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);

        route.stateChanged(state);

        expect(route.isResolving).toBe(true);
        const rendered = route.render();
        expect(rendered).toBe('');
      });

      it('after resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.path = '/';
        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue({});

        jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
    describe('with dynamic imported components with loading component', () => {
      const importFile = async (): Promise<unknown> => import('../../lit-redux-router.js');

      it('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.loading = 'my-loading';
        route.path = '/';
        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue(undefined);

        const spy = jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state, route.path);
        expect(route.isResolving).toBe(true);
        const rendered = route.render();
        expect(rendered).toBe('<my-loading></my-loading>');
      });

      it('after resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.loading = 'my-loading';
        route.path = '/';
        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue({});

        const spy = jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state, route.path);
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });

      it('before reject completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = async (): Promise<void> => Promise.reject();
        route.loading = 'my-loading';
        route.path = '/';
        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue(undefined);

        const spy = jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state, route.path);
        expect(route.isResolving).toBe(true);
        const rendered = route.render();
        expect(rendered).toBe('<my-loading></my-loading>');
      });

      it('after reject completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = async (): Promise<void> => Promise.reject();
        route.loading = 'my-loading';
        route.path = '/';

        const state = { activeRoute: route.path };

        customElementsGet.mockReturnValue({});

        const spy = jest.spyOn(selectors, 'isRouteActive').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state, route.path);
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
  });

  describe('nested routes', () => {
    it('composes and sets the path', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/second';
      route.parentElement = new Route();
      route.parentElement.path = '/first';
      route.parentElement.closest = (): void => undefined;
      const spy2 = jest
        .spyOn(route.parentElement, 'closest')
        .mockReturnValueOnce(route.parentElement);

      await route.firstUpdated();

      expect(route).toHaveProperty('path', '/first/second');

      spy.mockRestore();
      spy2.mockRestore();
    });

    it('does not compose and return its path when no child route', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/second';
      route.parentElement = {};
      route.parentElement.closest = (): void => undefined;
      const spy2 = jest.spyOn(route.parentElement, 'closest').mockReturnValueOnce(null);

      await route.firstUpdated();

      expect(route).toHaveProperty('path', '/second');

      spy.mockRestore();
      spy2.mockRestore();
    });

    it('parent routes match with wildcard', async () => {
      connectRouter(mockStore({}) as unknown as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/about';
      const childRoute = new Route();
      childRoute.path = '/me';
      const spy2 = jest.spyOn(route, 'querySelector').mockReturnValueOnce(childRoute);

      await route.firstUpdated();

      expect(route).toHaveProperty('path', '/about.*');

      spy.mockRestore();
      spy2.mockRestore();
    });
  });
});
