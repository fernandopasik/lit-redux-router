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
          [route]: {
            active: route === path,
          },
        }), {}),
      };
    case ADD_ROUTE:
      return {
        ...state,
        routes: {
          ...state.routes,
          [path]: {},
        },
      };
    default:
      return state;
  }
};

export default reducer;
