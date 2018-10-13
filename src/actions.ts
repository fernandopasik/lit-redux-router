import { NAVIGATE } from './constants';

export const navigate = (path: string = '/') => ({
  type: NAVIGATE,
  path,
});
