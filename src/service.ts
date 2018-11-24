import regexparam from 'regexparam';

export const refreshRoute = (route, activeRoute) => {
  const { pattern, keys } = regexparam(route);
  const match = pattern.exec(activeRoute);

  return {
    active: pattern.test(activeRoute),
    params: keys.reduce((list, item, index) => ({
      ...list,
      [item]: (match && match[index + 1]) || '',
    }), {}),
  };
};

export const checkNavigation = (route) => {
  window.history.pushState({}, '', route);
};
