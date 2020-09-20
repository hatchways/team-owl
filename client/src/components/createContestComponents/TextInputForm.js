import React, { useContext } from 'react';
import { ContestContext } from './ContestContext';
import { Typography, Box, TextField } from '@material-ui/core';
import useStyles from './CreateContestStyles';

const TextInputForm = () => {
  const classes = useStyles();
  const contest = useContext(ContestContext);

  return (
    <Box className={classes.textInputBox}>
      <Typography variant="h6" className={classes.subtitle}>
        What do you need to design?
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="tattoo-title"
          label="Write a descriptive contest title"
          variant="outlined"
          required
          className={classes.textFieldOne}
          onChange={(e) => contest.setTitle(e.target.value)}
        />
      </form>
      <Typography variant="h6" className={classes.subtitle}>
        Description
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="tattoo-description"
          label="Details about what type of tattoo you want"
          variant="outlined"
          multiline
          required
          rows={8}
          rowsMax={8}
          className={classes.textFieldOne}
          onChange={(e) => contest.setDescription(e.target.value)}
        />
      </form>
    </Box>
  );
};

export default TextInputForm;
