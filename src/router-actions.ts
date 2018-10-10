import { NAVIGATE } from './router-constants';

export const navigate = path => ({
  type: NAVIGATE,
  path,
});
