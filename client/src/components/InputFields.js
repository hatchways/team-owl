import 'date-fns';
import React, { Fragment } from 'react';
import { Typography, Container, Box, Button } from '@material-ui/core';
import TattoosGrid from './TattoosGrid';
import PrizeDateGrid from './prizeDateGrid';
import TextInputForm from './TextInputForm';
import useStyles from '../styles/styles';

const TextFields = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h4" m={3} className={classes.title}>
        Create New Contest
      </Typography>
      <Container boxShadow={3} maxWidth="md">
        <Box boxShadow={3} className={classes.mainBox}>
          <Container className={classes.innerContainer}>
            <Box className={classes.textInputBox}>
              <TextInputForm />
              <PrizeDateGrid />
              <TattoosGrid />
              <Box className={classes.alignItemsAndJustifyContent}>
                <Button variant="contained" className={classes.contestButton}>
                  <Typography className={classes.buttonText}>
                    Create Contest
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default TextFields;
