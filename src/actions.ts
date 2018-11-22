import { ADD_ROUTE, NAVIGATE, SET_ACTIVE_ROUTE } from './constants';
import { checkNavigation } from './service';

export const addRoute = (path: string) => ({
  type: ADD_ROUTE,
  path,
});

export const navigate = (path: string) => {
  checkNavigation(path);
  return {
    type: NAVIGATE,
    path,
  };
};

export const setActiveRoute = (path: string) => ({
  type: SET_ACTIVE_ROUTE,
  path,
});
