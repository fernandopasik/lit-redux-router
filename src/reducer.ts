import regexparam from 'regexparam';
import { ADD_ROUTE, NAVIGATE } from './constants';

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

const refreshRoute = (path, activePath) => {
  const { pattern, keys } = regexparam(path);
  const match = pattern.exec(activePath);

  return {
    active: pattern.test(activePath),
    params: keys.reduce((list, item, index) => ({
      ...list,
      [item]: (match && match[index + 1]) || '',
    }), {}),
  };
};

const reducer = (
  state: State = initialState,
  { type = '', path = '' }: Action = {},
) => {
  switch (type) {
    case NAVIGATE:
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
