export const contestReducer = (state, { type, payload }) => {
  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: payload };
    case 'TOAST':
      return {
        ...state,
        toast: {
          open: payload.open,
          message: payload.message,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};
