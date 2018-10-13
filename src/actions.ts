import { ADD_ROUTE, NAVIGATE } from './constants';

export const navigate = (path: string = '/') => ({
  type: NAVIGATE,
  path,
});

export const addRoute = (path: string) => ({
  type: ADD_ROUTE,
  path,
});
