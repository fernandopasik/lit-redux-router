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
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  test('do not match a parameter if route not active', () => {
    const route = '/product/:id';
    const activeRoute = '/other/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(false);
    expect(SUT.params).toStrictEqual({});
  });

  test('match a parameter and not after text', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(false);
    expect(SUT.params).toStrictEqual({});
  });

  test('match a parameter and after text', () => {
    const route = '/product/:id/edit';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  test('match a more than one parameter', () => {
    const route = '/product/:id/:time';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: 'nov2017' });
  });

  test('match a starting parameter', () => {
    const route = '/:id/product';
    const activeRoute = '/1/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  test('match an optional parameter without value', () => {
    const route = '/product/:id?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '' });
  });

  test('match an optional parameter with value', () => {
    const route = '/product/:id?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  test('match more than one optional parameter without values', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '', time: '' });
  });

  test('match more than one optional parameter with one value', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: '' });
  });

  test('match more than one optional parameter with all values', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: 'nov2017' });
  });

  test('check navigation pushes route to history', () => {
    const route = '/about';

    checkNavigation(route);

    expect(window.history.pushState).toHaveBeenCalledWith({}, '', route);
  });

  test('match routes with query string', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1?asdf=123';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });
});
