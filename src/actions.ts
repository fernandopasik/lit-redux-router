import { ADD_ROUTE, SET_ACTIVE_ROUTE } from './constants';

export const addRoute = (path: string) => ({
  type: ADD_ROUTE,
  path,
});

export const setActiveRoute = (path: string) => ({
  type: SET_ACTIVE_ROUTE,
  path,
});
