import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import MessagesPanel from './MessagesPanel';
import UseMessagesStyles from './MessagesStyles';
import ConversationsPanel from './ConversationsPanel';
import conversationContext from '../context/ConversationContext';

export default function Messages() {
  const classes = UseMessagesStyles();
  const context = useContext(conversationContext);
  const { state, sendMessage, dispatch, getOneConversation } = context;
  const { allConversations, activeConversation } = state;

  return (
    <Grid container className={classes.messageGrid}>
      <ConversationsPanel
        conversations={allConversations}
        activeConversation={activeConversation}
        dispatch={dispatch}
        getOneConversation={getOneConversation}
      />
      {activeConversation && activeConversation.messages && (
        <MessagesPanel
          activeConversation={activeConversation}
          sendMessage={sendMessage}
        />
      )}
    </Grid>
  );
}
