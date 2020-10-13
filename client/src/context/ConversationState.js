import React, { useReducer, useEffect, useState, useContext } from 'react';
import ConversationContext from './ConversationContext';
import { ConversationReducer } from './ConversationReducer';
import UserContext from '../context/UserContext';
import io from 'socket.io-client';

const ConversationState = (props) => {
  const [state, dispatch] = useReducer(ConversationReducer, {
    allConversations: [],
    isLoading: true,
    activeId: '',
    notifications: {
      messages: {},
      others: {},
    },
  });
  const [socket, setSocket] = useState();
  const ENDPOINT = 'localhost:3001';
  const context = useContext(UserContext);
  const { token, user } = context.state;

  // setting up socket
  useEffect(() => {
    if (token && !socket) {
      const socketClient = io(ENDPOINT, {
        query: {
          token: token,
        },
      });
      setSocket(socketClient);
    }
    return () => {
      if (socket) {
        socket.disconnect();
        setSocket('');
      }
    };
  }, [token, socket]);

  // join a room
  useEffect(() => {
    if (socket && state.activeId) {
      socket.emit('join', state.activeId);
    }
  }, [socket, state.activeId]);

  // receive a message
  useEffect(() => {
    if (socket) {
      socket.on('chatmessage', (data) => {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: data,
        });
      });
      socket.on('notification', (data) => {
        if (data)
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: data.newMessage,
          });
      });
    }
  }, [socket]);

  // send message
  const sendMessage = (message) => {
    socket.emit('sendMessage', {
      room: state.activeId,
      message,
    });
  };

  // get all conversations
  const getAllConversations = async () => {
    socket.emit('getAllConversations', { token }, (conversations) => {
      if (conversations.length) {
        dispatch({
          type: 'SET_ACTIVE_CONVERSATION',
          payload: conversations[0]._id,
        });
        dispatch({
          type: 'GET_ALL_CONVERSATIONS',
          payload: conversations,
        });
      }
      dispatch({ type: 'IS_LOADING', payloadL: false });
    });
  };

  // initiate new conversation or if present get the old one.
  const getNewConversation = async (participant) => {
    if (participant === user._id) return;
    const oldConversation = await state.allConversations.filter(
      (conversation) => participant === conversation.participants[0]._id,
    );
    if (oldConversation[0]) {
      dispatch({
        type: 'SET_ACTIVE_CONVERSATION',
        payload: oldConversation[0]._id,
      });
    } else {
      socket.emit('startConversation', { participant }, (newConversation) => {
        if (newConversation) {
          dispatch({
            type: 'ADD_NEW_CONVERSATION',
            payload: newConversation[0],
          });
        }
      });
    }
  };

  // get all the messages from one conversation
  const getOneConversation = async (conversationId) => {
    socket.emit('getOneConversation', conversationId, (oneConversation) => {
      dispatch({
        type: 'UPDATE_ONE_CONVERSATION',
        payload: oneConversation,
      });
      dispatch({
        type: 'SET_ACTIVE_CONVERSATION',
        payload: oneConversation._id,
      });
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        payload: { id: conversationId },
      });
    });
    socket.emit('leave', state.activeId);
  };

  const leaveRoom = () => {
    if (socket) {
      socket.emit('leave', state.activeId);
      dispatch({
        type: 'SET_ACTIVE_CONVERSATION',
        payload: '',
      });
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        state,
        socket,
        sendMessage,
        getNewConversation,
        getOneConversation,
        getAllConversations,
        leaveRoom,
        dispatch,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
