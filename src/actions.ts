import { ADD_ROUTE, NAVIGATE, SET_ACTIVE_ROUTE } from './constants';
import { checkNavigation } from './service';

export interface Actions {
  readonly type: string,
  path: string,
}

export const addRoute = (path: string): Actions => ({
  type: ADD_ROUTE,
  path,
});

export const navigate = (path: string): Actions => {
  checkNavigation(path);
  return {
    type: NAVIGATE,
    path,
  };
};

export const setActiveRoute = (path: string): Actions => ({
  type: SET_ACTIVE_ROUTE,
  path,
});
