import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import LandingStyles from './LandingStyles';

export default function Landing() {
  const classes = LandingStyles();

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.grid}
    >
      <Typography variant="h2">Home Page</Typography>
    </Grid>
  );
}
