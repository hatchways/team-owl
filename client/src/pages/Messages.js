import React, { useEffect, useContext } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import MessagesPanel from './MessagesPanel';
import UseMessagesStyles from './MessagesStyles';
import ConversationsPanel from './ConversationsPanel';
import conversationContext from '../context/ConversationContext';
import IsLoading from '../components/IsLoading';

export default function Messages() {
  const classes = UseMessagesStyles();
  const context = useContext(conversationContext);
  const {
    state,
    socket,
    sendMessage,
    dispatch,
    getOneConversation,
    getAllConversations,
    leaveRoom,
  } = context;
  const { allConversations, activeId, notifications } = state;
  const activeConversation = allConversations.filter((conversation) => {
    return conversation._id === activeId ? conversation : '';
  });

  useEffect(() => {
    if (socket) {
      getAllConversations();
    }
    return () => {
      leaveRoom();
    };
  }, [socket]);
  return (
    <Grid container className={classes.messageGrid}>
      {state.isLoading ? (
        <IsLoading />
      ) : activeConversation[0] ? (
        <>
          <ConversationsPanel
            conversations={allConversations}
            activeConversation={activeConversation[0]}
            dispatch={dispatch}
            getOneConversation={getOneConversation}
            allNotifications={notifications}
          />
          <MessagesPanel
            activeConversation={activeConversation[0]}
            sendMessage={sendMessage}
          />
        </>
      ) : (
        <Grid container justify="center" alignContent="center">
          <Typography variant="h5" display="block">
            {/* No Conversations */}
          </Typography>
          <Box width="100%" textAlign="center">
            <Typography variant="subtitle2" color="textSecondary">
              {/* Explore contests to start talking with any contest holders. */}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
