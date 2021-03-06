import React, { useContext, useState, useCallback } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  InputBase,
} from '@material-ui/core';
import UseMessagesPanelStyles from './MessagesPanelStyles';
import { isToday, format, parseISO } from 'date-fns';

import UserContext from '../context/UserContext';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function MessagePanel({ sendMessage, activeConversation }) {
  const [input, setInput] = useState('');
  const classes = UseMessagesPanelStyles();
  const userContext = useContext(UserContext);
  const user = userContext.state.user._id;
  const setRef = useCallback((element) => {
    if (element) {
      element.scrollIntoView({ smooth: true });
    }
  }, []);
  const lastMessage = activeConversation.messages.length - 1;

  const handleEnter = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      sendMessage(input);
    } else {
      console.log('empty message');
    }
    setInput('');
  };
  const messageJSX = activeConversation.messages.map((message, i) => {
    return (
      <Grid
        ref={lastMessage ? setRef : null}
        key={message._id}
        container
        justify={user === message.sender ? 'flex-end' : 'flex-start'}
      >
        <Box mb={1} maxWidth="35%">
          <Box
            bgcolor={
              user === message.sender ? 'primary.main' : 'secondary.main'
            }
            color={user === message.sender ? 'secondary.main' : 'primary.main'}
            borderRadius="25px"
            px={3}
            py={0.75}
          >
            <Typography variant="subtitle2">{message.message}</Typography>
            <Box fontSize="0.5rem" color="secondary.dark" align="right">
              {isToday(parseISO(message.sent))
                ? format(parseISO(message.sent), 'HH:MM')
                : format(parseISO(message.sent), 'dd/MM/yy hh a')}
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  });
  return (
    <Grid container item xs={12} md={8} lg={9} className={classes.messages}>
      <Grid
        container
        item
        className={classes.recepientName}
        alignContent="center"
      >
        <Grid container item lg={1} alignContent="center" justify="center">
          <Avatar
            src={activeConversation.participants[0].avatar}
            className={classes.large}
          />
        </Grid>
        <Grid container item lg={10} alignContent="center">
          <Typography variant="h6">
            <Box fontWeight="600">
              {activeConversation.participants[0].name}
            </Box>
          </Typography>
        </Grid>
        <Grid container item lg={1} alignContent="center" justify="center">
          <MoreHorizIcon color="primary" />
        </Grid>
      </Grid>
      <Grid container item className={classes.allMessagesGrid}>
        <Grid item xs={12} className={classes.allMessages}>
          {messageJSX}
        </Grid>
      </Grid>
      <Grid container item lg={12} className={classes.sendMessages}>
        <Grid container item md={10} justify="center" alignContent="center">
          <InputBase
            id="standard-basic"
            label="Standard"
            value={input}
            fullWidth
            multiline
            rowsMax={3}
            placeholder="Send Messages"
            classes={{
              root: classes.messageTextfield,
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleEnter(e);
              }
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </Grid>
        <Grid container item md={2} justify="center" alignContent="center">
          <Button
            color="primary"
            variant="contained"
            className={classes.buttonText}
            onClick={(e) => {
              handleEnter(e);
            }}
          >
            <Box px={2}>Send</Box>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
