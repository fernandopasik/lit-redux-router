import { RouterState, Route, RouteParams } from './reducer';

export interface State {
  router: RouterState;
}

export const getRoute = ({ router: { routes } }: State, route?: string): Route =>
  (routes && route && routes[route]) || {};

export const noRouteActive = ({ router: { routes } }: State): boolean =>
  Object.keys(routes).reduce(
    (noActive: boolean, route: string): boolean => noActive && !routes[route].active,
    true,
  );

export const isRouteActive = (state: State, route?: string): boolean =>
  route ? !!getRoute(state, route).active : noRouteActive(state);

export const getRouteParams = (state: State, route?: string): RouteParams =>
  getRoute(state, route).params ?? {};
