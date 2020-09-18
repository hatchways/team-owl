import React from 'react';
import { Typography, Box, TextField } from '@material-ui/core';
import useStyles from '../styles/styles';

const TextInputForm = () => {
  const classes = useStyles();

  return (
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
    </Box>
  );
};

export default TextInputForm;
