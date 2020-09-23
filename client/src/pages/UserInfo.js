import 'date-fns';
import React from 'react';
import { Avatar, Grid, TextField } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import UserInfoStyles from './UserInfoStyles';

export default function UserInfo({ value }) {
  const classes = UserInfoStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const formLabels = [
    ['Name', false],
    ['Email', false],
    ['Location', false],
    ['Birthday', true],
    ['Name', false],
    ['Name', false],
  ];
  const profileImage = '7c0c914fd9b8665800d4f0e4cc8e01c7042aaea8.png';
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.grid}
    >
      <Grid container justify="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={require(`../assets/${profileImage}`)}
          className={classes.avatar}
        />
      </Grid>
      <Grid container className={classes.forms} justify="center">
        {formLabels.map((formlabel, i) => {
          return (
            <Grid item key={i} xs={4} className={classes.form}>
              {' '}
              {!formlabel[1] ? (
                <TextField
                  id="outlined-basic"
                  label={formlabel[0]}
                  variant="outlined"
                  fullWidth
                  type={formlabel[1] ? 'date' : ''}
                />
              ) : (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="none"
                    variant="inline"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label={formlabel[0]}
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    fullWidth
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
