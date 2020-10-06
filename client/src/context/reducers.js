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
        isLoading: false,
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
    case 'CREATE_STRIPE_CREDIT_ACCOUNT':
      return {
        ...state,
        user: payload.user,
        isLoading: false,
      };
    case 'CREATE_STRIPE_BANK_ACCOUNT':
      return {
        ...state,
        user: payload.user,
        isLoading: false,
      };
    default:
      return state;
  }
};
