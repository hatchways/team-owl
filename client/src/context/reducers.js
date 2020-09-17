export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOG_OUT':
      return { token: undefined, user: undefined };
    case 'LOG_IN':
      return { token: payload.token, user: payload.user };
    case 'VERIFY_TOKEN':
      return { token: payload.token, user: payload.user };
    default:
      return state;
  }
};
