import { customElement } from 'lit-element';
import * as pwaHelpers from 'pwa-helpers';
import { LazyStore } from 'pwa-helpers/lazy-reducer-enhancer';
import { AnyAction, Store } from 'redux';
import configureStore from 'redux-mock-store';
import * as actions from '../actions';
import connectRouter, { RouteClass as Route } from '../route';
import * as selectors from '../selectors';

type TestStore = Store<Record<string, unknown>, AnyAction> & LazyStore;

jest.mock('lit-element', () => ({
  LitElement: class LitElement {
    public querySelector(): null {
      return null;
    }
  },
  html: jest.fn((strings, ...values) =>
    strings.map((string: string, index: number) => string + (values[index] || '')).join(''),
  ),
  customElement: jest.fn(),
  property: jest.fn(),
}));

jest.mock('lit-html/directives/unsafe-html.js', () => ({
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
  beforeAll(() => {
    Object.defineProperty(global, 'window', {
      value: {
        customElements: {
          define: jest.fn(),
        },
        decodeURIComponent: jest.fn((val) => val),
        scrollTo: jest.fn(),
      },
    });
  });

  it('defines the custom element', () => {
    connectRouter((mockStore({}) as unknown) as TestStore);

    expect(customElement).toHaveBeenCalledWith('lit-route');
  });

  describe('first updated', () => {
    it('installs router', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const route = new Route();

      route.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    it('installs router only once', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const route = new Route();
      const route2 = new Route();

      route.firstUpdated();
      route2.firstUpdated();

      expect(pwaHelpers.installRouter).toHaveBeenCalledTimes(1);
    });

    it('registers the route if path present', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      const path = '/1';
      route.path = path;

      route.firstUpdated();

      expect(spy).toHaveBeenCalledWith(path);

      spy.mockRestore();
    });

    it('does not register the route if path not present', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();

      route.firstUpdated();

      expect(spy).not.toHaveBeenCalled();

      spy.mockRestore();
    });

    it('can set active route', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
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
    it('can check if route active', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
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
      connectRouter((mockStore({}) as unknown) as TestStore);
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
      connectRouter((mockStore({}) as unknown) as TestStore);
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
      const importFile = async (): Promise<typeof import('../../lit-redux-router')> =>
        import('../../lit-redux-router');

      it('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.path = '/';
        const state = { activeRoute: route.path };

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
        const spy = jest.spyOn(route, 'stateChanged').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state);
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
    describe('with dynamic imported components with loading component', () => {
      const importFile = async (): Promise<typeof import('../../lit-redux-router')> =>
        import('../../lit-redux-router');

      it('before resolve completes', () => {
        const route = new Route();
        route.active = true;
        route.component = 'docs-page';
        route.resolve = importFile;
        route.loading = 'my-loading';
        route.path = '/';

        const state = { activeRoute: route.path };

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
        const spy = jest.spyOn(route, 'stateChanged').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state);
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
        const spy = jest.spyOn(route, 'stateChanged').mockImplementationOnce(() => true);
        route.stateChanged(state);

        expect(spy).toHaveBeenCalledWith(state);
        expect(route.isResolving).toBe(false);
        const rendered = route.render();
        expect(rendered).toBe('<docs-page></docs-page>');
      });
    });
  });

  describe('nested routes', () => {
    it('composes and sets the path', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/second';
      route.parentElement = new Route();
      route.parentElement.path = '/first';
      route.parentElement.closest = (): void => undefined;
      const spy2 = jest
        .spyOn(route.parentElement, 'closest')
        .mockReturnValueOnce(route.parentElement);

      route.firstUpdated();

      expect(route).toHaveProperty('path', '/first/second');

      spy.mockRestore();
      spy2.mockRestore();
    });

    it('does not compose and return its path when no child route', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/second';
      route.parentElement = {};
      route.parentElement.closest = (): void => undefined;
      const spy2 = jest.spyOn(route.parentElement, 'closest').mockReturnValueOnce(null);

      route.firstUpdated();

      expect(route).toHaveProperty('path', '/second');

      spy.mockRestore();
      spy2.mockRestore();
    });

    it('parent routes match with wildcard', () => {
      connectRouter((mockStore({}) as unknown) as TestStore);
      const spy = jest.spyOn(actions, 'addRoute');
      const route = new Route();
      route.path = '/about';
      const childRoute = new Route();
      childRoute.path = '/me';
      const spy2 = jest.spyOn(route, 'querySelector').mockReturnValueOnce(childRoute);

      route.firstUpdated();

      expect(route).toHaveProperty('path', '/about.*');

      spy.mockRestore();
      spy2.mockRestore();
    });
  });
});
