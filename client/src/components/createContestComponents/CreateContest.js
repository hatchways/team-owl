import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Button } from '@material-ui/core';
import { ContestContext } from '../../context/ContestContext';
import { getFromStorage } from '../../helper/localStorage';
import useStyles from './CreateContestStyles';
import Alert from './Alert';

const CreateContest = () => {
  const classes = useStyles();
  const history = useHistory();

  const context = useContext(ContestContext);

  const {
    title,
    description,
    prize,
    selectedDate: deadline,
    pics: contestPics,
    alertFn,
  } = context;

  const createContest = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !prize ||
      !deadline ||
      contestPics.length < 1
    ) {
      return alertFn(
        'Please complete all fields and select at least one image.'
      );
    }

    if (typeof prize !== 'number') {
      return alertFn('Prize must be a number.');
    }

    const date = Date.now();
    if (deadline < date) {
      return alertFn('Please pick a date and time in the future.');
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

      history.push(`/contest/${res.data._id}`);
    } catch (error) {
      return alertFn('Server error. Please re-try.');
    }
  };

  return (
    <Box className={classes.boxAroundBUtton}>
      <Button
        variant="contained"
        className={classes.contestButton}
        onClick={(e) => createContest(e)}
      >
        <Typography className={classes.buttonText}>Create Contest</Typography>
      </Button>
      <Alert />
    </Box>
  );
};

export default CreateContest;
