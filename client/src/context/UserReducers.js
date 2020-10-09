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
    case 'ALL_CONTESTS':
      return {
        ...state,
        allContests: payload.contests,
      };
    case 'USER_CONTESTS':
      return {
        ...state,
        contests: payload,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: payload,
      };
    case 'ALL_CONTESTS_BY_USER':
      return {
        ...state,
        contests: {
          created: payload.contests,
          submitted: [...state.contests.submitted],
        },
        isLoading: false,
      };
    default:
      return state;
  }
};
