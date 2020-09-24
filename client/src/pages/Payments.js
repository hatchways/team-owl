import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import PaymentsStyles from './PaymentsStyles';

export default function Payments() {
  const classes = PaymentsStyles();
  return (
    <Grid
      container
      alignContent="space-between"
      className={classes.upperBorder}
    >
      <Box mb={5}>
        <Typography variant="h5">Payments</Typography>
      </Box>
      <Grid container alignItems="center" justify="space-between"></Grid>
    </Grid>
  );
}
