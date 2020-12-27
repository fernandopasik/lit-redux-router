import type { ReadonlyDeep } from 'type-fest';
import type { Actions } from './actions';
import { ActionTypes } from './actions';
import { refreshRoute } from './service';

export interface RouteParams {
  [param: string]: string;
}

export interface Route {
  active: boolean;
  params?: RouteParams;
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
  state: ReadonlyDeep<RouterState> = initialState,
  { type = '', path = '' }: Action | Actions = {},
): RouterState => {
  switch (type) {
    case ActionTypes.NAVIGATE:
    case ActionTypes.SET_ACTIVE_ROUTE:
      return {
        ...state,
        activeRoute: path,
        routes: Object.keys(state.routes).reduce(
          (routes: Readonly<Record<string, Route>>, routeName: string): Record<string, Route> => ({
            ...routes,
            [routeName]: refreshRoute(routeName, path),
          }),
          {},
        ),
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
