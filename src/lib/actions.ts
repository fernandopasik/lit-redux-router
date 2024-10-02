import type { Action } from 'redux';
import { checkNavigation } from './service.js';

export enum ActionTypes {
  ADD_ROUTE = 'ADD_ROUTE',
  NAVIGATE = 'NAVIGATE',
  SET_ACTIVE_ROUTE = 'SET_ACTIVE_ROUTE',
}

export interface Actions extends Action {
  path: string;
  type: string;
}

export const addRoute = (path: string): Actions => ({
  path,
  type: ActionTypes.ADD_ROUTE,
});

export const navigate = (path: string): Actions => {
  checkNavigation(path);
  return {
    path,
    type: ActionTypes.NAVIGATE,
  };
};

export const setActiveRoute = (path: string): Actions => ({
  path,
  type: ActionTypes.SET_ACTIVE_ROUTE,
});
