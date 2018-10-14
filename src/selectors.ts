import { State as RouterState } from './reducer';

interface State {
  router: RouterState
}

export const isActive = (
  { router: { routes } }: State,
  route,
): boolean => routes[route].active;
