import regexparam from 'regexparam';
import type { Route, RouteParams } from './reducer';

export const refreshRoute = (route: string, activeRoute: string): Route => {
  const { pattern, keys } = regexparam(route);
  const noQueryRoute = activeRoute.replace(/(\?|#).*/, '');
  const match = pattern.exec(noQueryRoute);
  const active = pattern.test(noQueryRoute);

  return {
    active,
    params: !active
      ? {}
      : keys.reduce(
          (list: Readonly<RouteParams>, item: string, index: number): RouteParams => ({
            ...list,
            [item]: (match && match[index + 1]) || '',
          }),
          {},
        ),
  };
};

export const checkNavigation = (route: string): void => {
  window.history.pushState({}, '', route);
};
