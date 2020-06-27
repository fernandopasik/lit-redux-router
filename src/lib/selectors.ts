import type { ReadonlyDeep } from 'type-fest';
import { Route, RouteParams, RouterState } from './reducer';

export interface State {
  router: RouterState;
}

export const getRoute = (
  { router: { routes } }: ReadonlyDeep<State>,
  route?: string,
): Route | undefined =>
  typeof route !== 'undefined' && route in routes ? routes[route] : undefined;

export const noRouteActive = ({ router: { routes } }: ReadonlyDeep<State>): boolean =>
  Object.keys(routes).reduce(
    (noActive: boolean, route: string): boolean => noActive && !routes[route].active,
    true,
  );

export const isRouteActive = (state: ReadonlyDeep<State>, route?: string): boolean =>
  typeof route !== 'undefined' ? Boolean(getRoute(state, route)?.active) : noRouteActive(state);

export const getRouteParams = (state: ReadonlyDeep<State>, route?: string): RouteParams =>
  getRoute(state, route)?.params ?? {};
