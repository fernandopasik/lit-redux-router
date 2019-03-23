import { refreshRoute } from './service';
import { Actions, ActionTypes } from './actions';

export interface RouteParams {
  readonly [param: string]: string;
}

export interface Route {
  readonly active?: boolean;
  readonly params?: RouteParams;
}

export interface RouterState {
  readonly activeRoute: string;
  readonly routes: {
    readonly [path: string]: Route;
  };
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
    case ActionTypes.NAVIGATE:
    case ActionTypes.SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: path,
        routes: Object.keys(state.routes).reduce((routes, route) => ({
          ...routes,
          [route]: refreshRoute(route, path),
        }), {}),
      };
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
