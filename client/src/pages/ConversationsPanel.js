import React from 'react';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { isToday, format, parseISO } from 'date-fns';
import UseConversationsPanelStyles from './ConverstationsPanelStyles';

export default function Conversations({
  conversations,
  activeConversation,
  getOneConversation,
}) {
  const classes = UseConversationsPanelStyles();

  const handleChange = (id) => {
    getOneConversation(id);
  };

  const jsx = conversations.map((conversation, i) => {
    const active = activeConversation._id === conversation._id;
    const messages = conversation.messages;
    const lastMessage = messages[messages.length - 1];
    const participant = conversation.participants[0];
    return (
      <ListItem
        alignItems="center"
        button
        key={conversation._id}
        onClick={() => {
          handleChange(conversation._id);
        }}
        className={active ? classes.active : classes.inActive}
      >
        <ListItemAvatar>
          <Avatar src={participant.avatar} className={classes.avatar} />
        </ListItemAvatar>
        <ListItemText
          className={classes.listText}
          primary={<b>{participant.name}</b>}
          secondary={
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
            >
              {lastMessage.message.substr(0, 20) || ''}
            </Typography>
          }
        />
        <Box textAlign="right" color="secondary.dark">
          <Typography variant="caption">
            {isToday(parseISO(lastMessage.sent))
              ? format(parseISO(lastMessage.sent), 'HH:MM')
              : format(parseISO(lastMessage.sent), 'dd/MM')}
          </Typography>
        </Box>
      </ListItem>
    );
  });

  return (
    <Grid
      container
      item
      xs={12}
      md={4}
      lg={3}
      className={classes.coversationGrid}
    >
      <List
        component="div"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className={classes.listHeader}
          >
            <Typography variant="h6">Inbox Messages</Typography>
          </ListSubheader>
        }
        className={classes.root}
      >
        {jsx}
      </List>
    </Grid>
  );
}
