export const ConversationReducer = (state, { type, payload }) => {
  const findAndAddNotification = (state, payload) => {
    const { id, message } = payload;
    const newState = state.allConversations;
    const newAllConversation = newState.map((conversation) => {
      if (conversation._id === id) {
        conversation.notification
          ? conversation.notification.push(message)
          : (conversation.notification = [message]);
      }
      return conversation;
    });
    return { ...state, allConversations: newAllConversation };
  };

  const findAndRemoveNotification = (state, payload) => {
    const newState = state.allConversations;
    const newAllConversation = newState.map((conversation) => {
      if (conversation._id === payload) {
        conversation.notification && delete conversation.notification;
      }
      return conversation;
    });
    return { ...state, allConversations: newAllConversation };
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
    case 'ADD_MAIN_NOTIFICATION':
      return {
        ...state,
      };
    case 'ADD_INACTIVE_MESSAGE':
      return findAndAddNotification(state, payload);
    case 'REMOVE_INACTIVE_MESSAGE':
      return findAndRemoveNotification(state, payload);
    default:
      return state;
  }
};
