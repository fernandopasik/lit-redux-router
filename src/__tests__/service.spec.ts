import { checkNavigation, refreshRoute } from '../service';

describe('Router Service', () => {
  beforeAll(() => {
    Object.defineProperty(global, 'window', {
      value: {
        history: {
          pushState: jest.fn(),
        },
      },
    });
  });

  test('match static route', () => {
    const route = '/contact';
    const activeRoute = '/contact';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match a parameter', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match a parameter and not after text', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(false);
  });

  test('match a parameter and after text', () => {
    const route = '/product/:id/edit';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match a more than one parameter', () => {
    const route = '/product/:id/:time';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match a starting parameter', () => {
    const route = '/:id/product';
    const activeRoute = '/1/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match an optional parameter', () => {
    const route = '/product/:id?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match an optional parameter with matching', () => {
    const route = '/product/:id?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match more than one optional parameter', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match more than one optional parameter with one matching', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('match more than one optional parameter with all matching', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  test('check navigation pushes route to history', () => {
    const route = '/about';

    checkNavigation(route);

    expect(window.history.pushState).toHaveBeenCalledWith({}, '', route);
  });
});
