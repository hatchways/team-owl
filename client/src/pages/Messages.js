import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import MessagesPanel from './MessagesPanel';
import UseMessagesStyles from './MessagesStyles';
import ConversationsPanel from './ConversationsPanel';
import conversationContext from '../context/ConversationContext';

export default function Messages() {
  const classes = UseMessagesStyles();
  const context = useContext(conversationContext);
  const { state, sendMessage, dispatch, getOneConversation } = context;
  const { allConversations, activeId } = state;
  const activeConversation = allConversations.filter((conversation) => {
    if (conversation._id === activeId) return conversation;
  });

  return (
    <Grid container className={classes.messageGrid}>
      <ConversationsPanel
        conversations={allConversations}
        activeConversation={activeConversation[0]}
        dispatch={dispatch}
        getOneConversation={getOneConversation}
      />
      {activeConversation[0] && (
        <MessagesPanel
          activeConversation={activeConversation[0]}
          sendMessage={sendMessage}
        />
      )}
    </Grid>
  );
}
