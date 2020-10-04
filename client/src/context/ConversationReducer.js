export const ConversationReducer = (state, { type, payload }) => {
  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: payload };
    case 'GET_ALL_CONVERSATIONS':
      return { ...state, allConversations: payload };
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeConversation: payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        activeConversation: {
          ...state.activeConversation,
          messages: [...state.activeConversation.messages, payload],
        },
      };
    default:
      return state;
  }
};
