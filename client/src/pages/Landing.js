import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import useLandingStyles from './Landing_Css';

export default function Landing() {
  const classes = useLandingStyles();

  return (
    <>
      <Grid
        container
        justify="center"
        alignContent="center"
        className={classes.grid}
      >
        <Typography variant="h2">Home Page</Typography>
      </Grid>
    </>
  );
}
