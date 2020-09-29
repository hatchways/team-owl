import React from 'react';
import { Grid } from '@material-ui/core';
import UseMessagesStyles from './MessagesStyles';

export default function Messages() {
  const classes = UseMessagesStyles();
  return (
    <Grid container className={classes.messageGrid}>
      <Grid
        container
        item
        xs={false}
        md={4}
        lg={3}
        className={classes.conversattions}
      ></Grid>
      <Grid
        container
        item
        xs={12}
        md={8}
        lg={9}
        className={classes.messages}
      ></Grid>
    </Grid>
  );
}
