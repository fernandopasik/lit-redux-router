export interface State {}

interface Action {
  type?: string,
}

const initialState = {};

const reducer = (
  state: State = initialState,
  { type = '' }: Action = {},
) => {
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
