import React, { useReducer, useEffect, useState, useContext } from 'react';
import ConversationContext from './ConversationContext';
import { ConversationReducer } from './ConversationReducer';
import { fetchAllConversations } from '../helper/Fetch';
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
  const { token } = context.state;

  useEffect(() => {
    if (token) {
      const getAllConversations = async () => {
        const conversations = await fetchAllConversations(token);
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
      };
      getAllConversations();
    }
  }, [token, fetchAllConversations]);

  useEffect(() => {
    if (token) {
      const socketClient = io(ENDPOINT, {
        query: {
          token: token,
        },
      });
      setSocket(socketClient);
    }
  }, [token]);

  useEffect(() => {
    if (socket && state.activeConversation) {
      socket.emit('join', state.activeConversation._id);
    }
  }, [socket, state.activeConversation]);

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

  const sendMessage = (message) => {
    socket.emit('sendMessage', {
      room: state.activeConversation._id,
      message,
    });
  };
  // get all the conversations

  // get all the messages from one conversation

  // send a message to the receipient.

  return (
    <ConversationContext.Provider
      value={{ state, socket, sendMessage, dispatch }}
    >
      {props.children}
    </ConversationContext.Provider>
  );
};

export default ConversationState;
