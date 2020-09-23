import React from 'react';
import { Grid } from '@material-ui/core';
import EditProfileStyles from './EditProfileStyles';
import UserInfo from './UserInfo';
import Payments from './Payments';
import NotificationSettings from './NotificationSettings';

export default function Profile() {
  const classes = EditProfileStyles();

  return (
    <Grid container className={classes.grid} alignContent="flex-start">
      <UserInfo />
      <Payments />
      <NotificationSettings />
    </Grid>
  );
}
