import React, { useReducer, useEffect, useState, useContext } from 'react';
import ConversationContext from './ConversationContext';
import { ConversationReducer } from './ConversationReducer';
import UserContext from '../context/UserContext';
import io from 'socket.io-client';

const ConversationState = (props) => {
  const [state, dispatch] = useReducer(ConversationReducer, {
    allConversations: [],
    activeConversation: {},
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

  // get all conversations
  useEffect(() => {
    if (token && socket) {
      const getAllConversations = async () => {
        socket.emit('getAllConversations', {
          token,
        });
        socket.on('getAllConversations', (conversations) => {
          if (conversations) {
            dispatch({
              type: 'SET_ACTIVE_CONVERSATION',
              payload: conversations[0],
            });
            dispatch({
              type: 'GET_ALL_CONVERSATIONS',
              payload: conversations,
            });
          }
        });
      };
      getAllConversations();
    }
  }, [token, socket]);

  // join a room
  useEffect(() => {
    if (socket && state.activeConversation) {
      socket.emit('join', state.activeConversation._id);
    }
  }, [socket, state.activeConversation]);

  // receive a message
  useEffect(() => {
    if (socket) {
      socket.on('chatmessage', (data) => {
        console.log(data.message[0]);
        dispatch({
          type: 'ADD_MESSAGE',
          payload: data.message[0],
        });
      });
    }
  }, [socket]);

  // send message
  const sendMessage = (message) => {
    socket.emit('sendMessage', {
      room: state.activeConversation._id,
      message,
    });
  };

  // initiate new conversation or if present get the old one.
  const getNewConversation = async (participant) => {
    if (participant === user._id) return;

    const oldConversation = await state.allConversations.filter(
      (conversation) => {
        if (participant === conversation.participants[0]._id) {
          return conversation;
        }
      },
    );
    if (oldConversation) {
      dispatch({
        type: 'SET_ACTIVE_CONVERSATION',
        payload: oldConversation[0],
      });
    } else {
      socket.emit('startConversation', { participant });
      socket.on('sendNewConversation', (newConversation) => {
        console.log(newConversation);
        if (newConversation) {
          dispatch({
            type: 'ADD_NEW_CONVERSATION',
            payload: newConversation,
          });
          dispatch({
            type: 'SET_ACTIVE_CONVERSATION',
            payload: newConversation,
          });
        }
      });
    }
  };

  // get all the messages from one conversation
  const getOneConversation = async (conversationId) => {
    socket.emit('getOneConversation', conversationId);
    socket.on('getOneConversation', (oneConversation) => {
      dispatch({
        type: 'SET_ACTIVE_CONVERSATION',
        payload: oneConversation,
      });
    });
  };

  return (
    <ConversationContext.Provider
      value={{
        state,
        socket,
        sendMessage,
        getNewConversation,
        getOneConversation,
        dispatch,
      }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
