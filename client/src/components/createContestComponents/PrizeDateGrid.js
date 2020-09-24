import 'date-fns';
import React, { useContext } from 'react';
import { Typography, Grid, Paper, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { ContestContext } from './ContestContext';
import useStyles from './CreateContestStyles';

const PrizeDateGrid = () => {
  const contest = useContext(ContestContext);
  const classes = useStyles();

  const handleDateChange = (date) => {
    contest.setSelectedDate(date);
  };

  return (
    <Grid container spacing={2} className={classes.prizeTimeBox}>
      <Grid item xs={4}>
        <Typography className={classes.prizeTimeSub}>Prize amount</Typography>
        <Paper className={classes.paper} elevation={0}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="prize"
              label="$"
              defaultValue="100"
              variant="outlined"
              required
              className={classes.textFieldOne}
              onChange={(e) => contest.setPrize(Number(e.target.value))}
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
              id="date-picker"
              label="Date"
              format="MM/dd/yyyy"
              required
              value={contest.selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              required
              value={contest.selectedDate}
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
