import { State as RouterState, Route, RouteParams } from './reducer';

interface State {
  router: RouterState
}

export const getRoute = (
  { router: { routes } }: State,
  route: string,
): Route => routes[route] || {};

export const isRouteActive = (
  state: State,
  route: string,
): boolean => !!getRoute(state, route).active;

export const getRouteParams = (
  state: State,
  route: string,
): RouteParams => getRoute(state, route).params || {};
