import type { Route, RouterState } from './reducer.js';

export interface State {
  router: RouterState;
}

export const getRoute = ({ router: { routes } }: State, route?: string): Route | undefined =>
  typeof route !== 'undefined' && route in routes ? routes[route] : undefined;

export const noRouteActive = ({ router: { routes } }: State): boolean =>
  Object.keys(routes).reduce(
    (noActive: boolean, route: string): boolean => noActive && !routes[route].active,
    true,
  );

export const isRouteActive = (state: State, route?: string): boolean =>
  typeof route !== 'undefined' ? Boolean(getRoute(state, route)?.active) : noRouteActive(state);

export const getRouteParams = (state: State, route?: string): NonNullable<Route['params']> =>
  getRoute(state, route)?.params ?? {};
