import React, { useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Button } from '@material-ui/core';
import { ContestContext } from './ContestContext';
import useStyles from './CreateContestStyles';

export const CreateContest = () => {
  const classes = useStyles();
  const contest = useContext(ContestContext);

  const {
    title,
    description,
    prize,
    selectedDate: deadline,
    pics: contestPics,
  } = contest;

  const createContest = async () => {
    if (
      !title ||
      !description ||
      !prize ||
      !deadline ||
      contestPics.length < 1
    ) {
      return alert('Please fill out all fields and pick the tattoos you like');
    }

    if (typeof prize !== 'number') {
      return alert('Prize must be a number');
    }

    try {
      const res = await axios.post('/api/contest', {
        title,
        description,
        prize,
        deadline,
        contestPics,
      });
      console.log(res.data);
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
    </Box>
  );
};

export default CreateContest;
