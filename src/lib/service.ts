import { parse } from 'regexparam';
import type { Route } from './reducer.ts';

export const refreshRoute = (route: string, activeRoute: string): Route => {
  const { pattern, keys } = parse(route);
  // eslint-disable-next-line prefer-named-capture-group
  const noQueryRoute = activeRoute.replace(/(\?|#).*/u, '');
  const match = pattern.exec(noQueryRoute);
  const active = pattern.test(noQueryRoute);

  return {
    active,
    params: active
      ? keys.reduce(
          (
            list: NonNullable<Route['params']>,
            item: string,
            index: number,
          ): NonNullable<Route['params']> => ({
            ...list,
            [item]: match?.[index + 1] ?? '',
          }),
          {},
        )
      : {},
  };
};

export const checkNavigation = (route: string): void => {
  window.history.pushState({}, '', route);
};
