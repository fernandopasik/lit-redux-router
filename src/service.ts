import regexparam from 'regexparam';
import { RouteParams } from './reducer';

export const refreshRoute = (route: string, activeRoute: string) => {
  const { pattern, keys } = regexparam(route);
  const noQueryRoute = activeRoute.replace(/\?.*/, '');
  const match = pattern.exec(noQueryRoute);
  const active = pattern.test(noQueryRoute);

  return {
    active,
    params: !active ? {} : keys.reduce((list: RouteParams, item: string, index: number) => ({
      ...list,
      [item]: (match && match[index + 1]) || '',
    }), {}),
  };
};

export const checkNavigation = (route: string) => {
  window.history.pushState({}, '', route);
};
