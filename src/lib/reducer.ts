import { ActionTypes, type Actions } from './actions.js';
import { refreshRoute } from './service.js';

export interface Route {
  active: boolean;
  params?: Record<string, string>;
}

export interface RouterState {
  activeRoute: string;
  routes: Record<string, Route>;
}

interface Action {
  type?: string;
  path?: string;
}

const initialState = {
  activeRoute: '/',
  routes: {},
};

const reducer = (
  state: RouterState = initialState,
  { type = '', path = '' }: Action | Actions = {},
): RouterState => {
  switch (type) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    case ActionTypes.NAVIGATE:
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison, no-fallthrough
    case ActionTypes.SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: path,
        routes: Object.keys(state.routes).reduce(
          (routes: Record<string, Route>, routeName: string): Record<string, Route> => ({
            ...routes,
            [routeName]: refreshRoute(routeName, path),
          }),
          {},
        ),
      };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    case ActionTypes.ADD_ROUTE:
      return {
        ...state,
        routes: {
          ...state.routes,
          [path]: refreshRoute(path, state.activeRoute),
        },
      };
    default:
      return state;
  }
};

export default reducer;
