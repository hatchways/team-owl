import 'date-fns';
import React, { useState } from 'react';
import { Typography, Grid, Paper, TextField } from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from '../styles/styles';

const PrizeDateGrid = () => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.prizeTimeBox}>
      <Grid item xs={4}>
        <Typography className={classes.prizeTimeSub}>Prize amount</Typography>
        <Paper className={classes.paper} elevation={0}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="$"
              variant="outlined"
              className={classes.textFieldOne}
            />
          </form>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Typography className={classes.prizeTimeSub}>Deadline</Typography>
        <Paper className={classes.paper} elevation={0}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrizeDateGrid;
