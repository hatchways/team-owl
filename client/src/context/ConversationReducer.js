export const ConversationReducer = (state, { type, payload }) => {
  const addNotification = (state, payload) => {
    const { conversationId } = payload;
    const newState = state.notifications;
    if (newState.messages[conversationId]) {
      newState.messages[conversationId].push(payload);
    } else {
      newState.messages[conversationId] = [payload];
    }
    return { ...state, notifications: newState };
  };

  const removeNotification = (state, payload) => {
    const { id } = payload;
    const newState = state.notifications;
    if (newState.messages[id]) {
      delete newState.messages[id];
    }
    return { ...state, notifications: newState };
  };

  const updateOneConversation = (state, payload) => {
    const newState = state.allConversations;
    const newAllConversation = newState.map((conversation) => {
      if (conversation._id === payload._id) {
        return payload;
      }
      return conversation;
    });
    return { ...state, allConversations: newAllConversation };
  };

  const addMessageToConversation = (state, payload) => {
    const newState = state.allConversations;
    const { activeId } = state;
    const newAllConversation = newState.map((conversation) => {
      if (activeId === conversation._id) {
        conversation.messages.push(payload);
      }
      return conversation;
    });
    return { ...state, allConversations: newAllConversation };
  };

  switch (type) {
    case 'IS_LOADING':
      return { ...state, isLoading: payload };
    case 'GET_ALL_CONVERSATIONS':
      return { ...state, allConversations: payload };
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeId: payload };
    case 'UPDATE_ONE_CONVERSATION':
      return updateOneConversation(state, payload);
    case 'ADD_MESSAGE':
      return addMessageToConversation(state, payload);
    case 'ADD_NEW_CONVERSATION':
      return {
        ...state,
        allConversations: [...state.allConversations, payload],
        activeId: payload._id,
      };
    case 'ADD_NOTIFICATION':
      return addNotification(state, payload);
    case 'REMOVE_NOTIFICATION':
      return removeNotification(state, payload);
    default:
      return state;
  }
};
