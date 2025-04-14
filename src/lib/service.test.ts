import { describe, expect, it, jest } from '@jest/globals';
import { checkNavigation, refreshRoute } from './service.ts';

describe('router service', () => {
  it('match static route', () => {
    const route = '/contact';
    const activeRoute = '/contact';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
  });

  it('match a parameter', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  it('do not match a parameter if route not active', () => {
    const route = '/product/:id';
    const activeRoute = '/other/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(false);
    expect(SUT.params).toStrictEqual({});
  });

  it('match a parameter and not after text', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(false);
    expect(SUT.params).toStrictEqual({});
  });

  it('match a parameter and after text', () => {
    const route = '/product/:id/edit';
    const activeRoute = '/product/1/edit';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  it('match a more than one parameter', () => {
    const route = '/product/:id/:time';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: 'nov2017' });
  });

  it('match a starting parameter', () => {
    const route = '/:id/product';
    const activeRoute = '/1/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  it('match an optional parameter without value', () => {
    const route = '/product/:id?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '' });
  });

  it('match an optional parameter with value', () => {
    const route = '/product/:id?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });

  it('match more than one optional parameter without values', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '', time: '' });
  });

  it('match more than one optional parameter with one value', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: '' });
  });

  it('match more than one optional parameter with all values', () => {
    const route = '/product/:id?/:time?';
    const activeRoute = '/product/1/nov2017';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1', time: 'nov2017' });
  });

  it('check navigation pushes route to history', () => {
    const route = '/about';
    const spy = jest.spyOn(window.history, 'pushState');

    checkNavigation(route);

    expect(spy).toHaveBeenCalledWith({}, '', route);
  });

  it('match routes with query string', () => {
    const route = '/product/:id';
    const activeRoute = '/product/1?asdf=123';

    const SUT = refreshRoute(route, activeRoute);

    expect(SUT.active).toBe(true);
    expect(SUT.params).toStrictEqual({ id: '1' });
  });
});
