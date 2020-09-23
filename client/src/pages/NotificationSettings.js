import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import NotificationSettingsStyles from './NotificationSettingsStyles';

export default function Payments() {
  const classes = NotificationSettingsStyles();
  return (
    <Grid
      container
      alignContent="space-between"
      className={classes.upperBorder}
    >
      <Box mb={5}>
        <Typography variant="h5">Notification Settings</Typography>
      </Box>
      <Grid container alignItems="center" justify="space-between"></Grid>
    </Grid>
  );
}
