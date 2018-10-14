export const filterComponentTag = (tag: string = '') => tag
  .split('')
  .filter(char => char.match(/[A-Za-z-]/))
  .join('');
