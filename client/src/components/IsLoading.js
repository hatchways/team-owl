import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export default function IsLoading() {
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      style={{ height: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  );
}
