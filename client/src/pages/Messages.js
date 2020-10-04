import React, { useState, useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import MessagesPanel from './MessagesPanel';
import UseMessagesStyles from './MessagesStyles';
import Conversations from './Conversations';
import conversationContext from '../context/ConversationContext';

export default function Messages() {
  const classes = UseMessagesStyles();
  const [value, setValue] = useState(0);
  const context = useContext(conversationContext);
  const { socket, state, sendMessage, dispatch } = context;
  const { allConversations, activeConversation } = state;

  return (
    <Grid container className={classes.messageGrid}>
      <Conversations
        value={value}
        setValue={setValue}
        conversations={allConversations}
        dispatch={dispatch}
      />
      {activeConversation.messages && (
        <MessagesPanel
          activeConversation={activeConversation}
          sendMessage={sendMessage}
        />
      )}
    </Grid>
  );
}
