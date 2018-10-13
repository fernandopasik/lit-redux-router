import { NAVIGATE } from './constants';

export interface State {
  activeRoute: string,
}

interface Action {
  type?: string,
  path?: string,
}

const initialState = {
  activeRoute: '/',
};

const reducer = (
  state: State = initialState,
  { type = '', path = '' }: Action = {},
) => {
  switch (type) {
    case NAVIGATE:
      return {
        ...state,
        activeRoute: path,
      };
    default:
      return state;
  }
};

export default reducer;
