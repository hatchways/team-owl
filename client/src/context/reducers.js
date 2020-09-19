export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: true };
    case 'LOG_OUT':
      return { ...state, token: undefined, user: undefined, isLoading: false };
    case 'LOG_IN':
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoading: false,
      };
    case 'VERIFY_TOKEN':
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoading: false,
      };
    case 'TOAST':
      return {
        ...state,
        toast: {
          open: payload.open,
          message: payload.message,
        },
      };
    default:
      return state;
  }
};
