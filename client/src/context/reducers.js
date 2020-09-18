export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOG_OUT':
      return { ...state, token: undefined, user: undefined };
    case 'LOG_IN':
      return { ...state, token: payload.token, user: payload.user };
    case 'VERIFY_TOKEN':
      return { ...state, token: payload.token, user: payload.user };
    case 'TOAST':
      return {
        ...state,
        toast: { open: payload.open, message: payload.message },
      };
    default:
      return state;
  }
};
