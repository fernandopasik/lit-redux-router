import { State as RouterState, Route, RouteParams } from './reducer';

interface State {
  router: RouterState
}

export const getRoute = (
  { router: { routes } }: State,
  route: string,
): Route => routes[route] || {};

export const noRouteActive = (
  { router: { routes } }: State,
): boolean => (
  Object
    .keys(routes)
    .reduce(
      (noActive, route) => noActive && !routes[route].active,
      true,
    )
);

export const isRouteActive = (
  state: State,
  route?: string,
): boolean => (
  route
    ? !!getRoute(state, route).active
    : noRouteActive(state)
);

export const getRouteParams = (
  state: State,
  route: string,
): RouteParams => getRoute(state, route).params || {};
