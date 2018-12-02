import regexparam from 'regexparam';
import { RouteParams } from './reducer';

export const refreshRoute = (route: string, activeRoute: string) => {
  const { pattern, keys } = regexparam(route);
  const match = pattern.exec(activeRoute);

  return {
    active: pattern.test(activeRoute),
    params: keys.reduce((list: RouteParams, item: string, index: number) => ({
      ...list,
      [item]: (match && match[index + 1]) || '',
    }), {}),
  };
};

export const checkNavigation = (route: string) => {
  window.history.pushState({}, '', route);
};
