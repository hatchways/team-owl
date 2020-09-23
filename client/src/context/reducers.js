export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: payload };
    case 'LOG_OUT':
      return {
        ...state,
        token: undefined,
        user: undefined,
        isLoading: false,
        authed: false,
      };
    case 'LOG_IN':
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoading: false,
        authed: true,
      };
    case 'VERIFY_TOKEN':
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isLoading: false,
        authed: true,
      };
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
