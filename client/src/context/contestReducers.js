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
          severity: payload.severity,
        },
        isLoading: false,
      };
    case 'GET_CONTEST_BY_ID':
      return {
        ...state,
        contest: payload.contest,
        isLoading: false,
      };
    default:
      return state;
  }
};
