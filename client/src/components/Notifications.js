import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import useNotificationsStyles from './NotificationsStyles';
import conversationContext from '../context/ConversationContext';
import { useHistory } from 'react-router-dom';

export default function Notifications() {
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const [badge, setbadge] = useState(0);
  const classes = useNotificationsStyles();
  const context = useContext(conversationContext);
  const { getOneConversation, state } = context;
  const { notifications } = state;
  const notificationsMessages = Object.keys(notifications.messages);
  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleNotification = (current) => {
    getOneConversation(current.conversationId);
    setMenu(null);
    history.push('/messages');
  };

  useEffect(() => {
    setbadge(notificationsMessages.length);
  }, [notificationsMessages.length]);

  const notificationJSX = notificationsMessages.map((objectKey, i) => {
    const current = notifications.messages[objectKey][0];
    return (
      <MenuItem
        onClick={() => {
          handleNotification(current);
        }}
        key={i}
      >
        <Box px={2} py={1} borderBottom={1} borderColor="primary.main">
          <Typography variant="subtitle2">
            Message from {'  '}
            <b>{current.senderName}</b>
          </Typography>
        </Box>
      </MenuItem>
    );
  });

  return (
    <>
      <Button
        aria-controls="Notification-Menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
        color="secondary"
        className={classes.button}
        disableRipple
      >
        <Badge badgeContent={badge} color="secondary" invisible={!badge}>
          <Typography variant="button" className={classes.buttonText}>
            Notification
          </Typography>
        </Badge>
      </Button>
      <Menu
        id="Notification-Menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={() => {
          setMenu(null);
        }}
      >
        {notificationJSX}
      </Menu>
    </>
  );
}
