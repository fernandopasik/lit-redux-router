import { State as RouterState, Route } from './reducer';

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
