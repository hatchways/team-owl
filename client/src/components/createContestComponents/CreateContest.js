import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { ContestContext } from './ContestContext';
import { getFromStorage } from '../../helper/localStorage';
import useStyles from './CreateContestStyles';

export const CreateContest = () => {
  const classes = useStyles();
  const contest = useContext(ContestContext);
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [severity, setSeverity] = useState('');

  const {
    title,
    description,
    prize,
    selectedDate: deadline,
    pics: contestPics,
  } = contest;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createContest = async () => {
    setOpen(true);

    if (
      !title ||
      !description ||
      !prize ||
      !deadline ||
      contestPics.length < 1
    ) {
      setSeverity('warning');
      setAlertText('Please fill out all fields and pick the tattoos you like');
      return Alert();
    }

    if (typeof prize !== 'number') {
      setSeverity('warning');
      setAlertText('Prize must be a number');
      return Alert();
    }

    const token = getFromStorage('auth_token');
    try {
      const res = await axios.post(
        '/api/contest',
        {
          title,
          description,
          prize,
          deadline,
          contestPics,
        },
        {
          headers: {
            auth_token: `Bearer ${token}`,
          },
        }
      );
      setSeverity('success');
      setAlertText('Contest successfully created!');
      Alert();
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Box className={classes.alignItemsAndJustifyContent}>
      <Button
        variant="contained"
        className={classes.contestButton}
        onClick={(e) => createContest(e)}
      >
        <Typography className={classes.buttonText}>Create Contest</Typography>
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alertText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateContest;
