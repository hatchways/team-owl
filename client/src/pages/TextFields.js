import 'date-fns';
import React, { Fragment } from 'react';
import {
  Typography,
  Container,
  makeStyles,
  Box,
  TextField,
  Grid,
  Paper,
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  navLinks: {
    color: theme.palette.secondary.light,
    marginRight: theme.spacing(3),
    borderColor: '#ffffff',
  },
  tempBackground: {
    height: '100vh',
  },

  mainBox: {
    height: '50rem',
    margin: 'auto',
  },

  textInputBox: {
    height: '24rem',
    width: '100%',
    margin: 'auto',
  },

  prizeTimeBox: {
    paddingTop: theme.spacing(6),
  },

  innerContainer: {
    maxWidth: '75%',
    height: '48rem',
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    fontFamily: 'Poppins-Semibold',
  },
  subtitle: {
    textAlign: 'left',
    paddingTop: theme.spacing(6),
    fontFamily: 'Poppins-Semibold',
  },
  subtext: {
    color: theme.palette.grey.dark,
    marginTop: theme.spacing(1),
  },
  prizeTimeSub: {
    textAlign: 'left',
    fontFamily: 'Poppins-Semibold',
  },
  textFieldOne: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  paper: {
    backgroundColor: 'white',
  },
}));

const TextFields = () => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h4" m={3} className={classes.title}>
        Create New Contest
      </Typography>
      <Container className={classes.tempBackground} boxShadow={3} maxWidth="md">
        <Box boxShadow={3} className={classes.mainBox}>
          <Container className={classes.innerContainer}>
            <Box className={classes.textInputBox}>
              <Typography variant="h6" className={classes.subtitle}>
                What do you need to design?
              </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Write a descriptive contest title"
                  variant="outlined"
                  className={classes.textFieldOne}
                />
              </form>
              <Typography variant="h6" className={classes.subtitle}>
                Description
              </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="outlined-basic"
                  label="Details about what type of tattoo you want"
                  variant="outlined"
                  multiline
                  rows={8}
                  rowsMax={8}
                  className={classes.textFieldOne}
                />
              </form>
              <Grid container spacing={2} className={classes.prizeTimeBox}>
                <Grid item xs={4}>
                  <Typography className={classes.prizeTimeSub}>
                    Prize amount
                  </Typography>
                  <Paper className={classes.paper} elevation={0}>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
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
                  <Typography className={classes.prizeTimeSub}>
                    Deadline
                  </Typography>
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
              <Box className={classes.prizeTimeBox}>
                <Typography variant="h6" className={classes.prizeTimeSub}>
                  Which designs do you like?
                </Typography>
                <Typography variant="body" className={classes.subtext}>
                  Let's start by helping your designers understands which stype
                  you prefer.
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default TextFields;
