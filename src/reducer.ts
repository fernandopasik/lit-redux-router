import { ADD_ROUTE, NAVIGATE, SET_ACTIVE_ROUTE } from './constants';
import { refreshRoute } from './service';
import { Actions } from './actions';

export interface RouteParams {
  [param: string]: string
}

export interface Route {
  active?: boolean,
  params?: RouteParams
}

export interface State {
  activeRoute: string,
  routes: {
    [path: string]: Route
  },
}

interface Action {
  type?: string,
  path?: string,
}

const initialState = {
  activeRoute: '/',
  routes: {},
};

const reducer = (
  state: State = initialState,
  { type = '', path = '' }: Action | Actions = {},
) => {
  switch (type) {
    case NAVIGATE:
    case SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: path,
        routes: Object.keys(state.routes).reduce((routes, route) => ({
          ...routes,
          [route]: refreshRoute(route, path),
        }), {}),
      };
    case ADD_ROUTE:
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
