import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Tabs,
  Tab,
  InputBase,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import UseConversationsStyles from './ConverstationsStyles';

export default function Conversations({
  value,
  setValue,
  conversations,
  dispatch,
}) {
  const classes = UseConversationsStyles();

  const handleChange = (i) => {
    dispatch({
      type: 'SET_ACTIVE_CONVERSATION',
      payload: conversations[i],
    });
    setValue(i);
  };

  const jsx = conversations.map((conversation, i) => {
    return (
      <ListItem
        alignItems="center"
        button
        key={i}
        onClick={() => {
          handleChange(i);
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={conversation.participants[0].avatar}
            className={classes.large}
          />
        </ListItemAvatar>
        <ListItemText
          className={classes.listText}
          primary={conversation.participants[0].name}
          secondary={
            <Typography component="span" variant="body2" color="textPrimary">
              Hello
            </Typography>
          }
        />
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
        className={classes.list}
      >
        {jsx}
      </List>
    </Grid>
  );
}

{
  /* <Grid container item lg={12} className={classes.conversations}> */
}
{
  /* <Grid
    container
    item
    lg={12}
    className={classes.messageHeading}
    justify="center"
    alignContent="center"
    >
    <Typography variant="h6">Inbox Messages</Typography>
  </Grid> */
}
{
  /* <Tabs
    orientation="vertical"
    variant="fullWidth"
    value={value}
    onChange={handleChange}
    aria-label="Vertical tabs example"
    className={classes.root}
    TabIndicatorProps={{
      style: {
        width: '2px',
      },
    }}
    indicatorColor="primary"
  > */
}
{
  /* </Tabs>{' '} */
}
//   </Grid>
// </Grid>
