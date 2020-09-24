import React, { Fragment } from 'react';
import { Typography, Container, Box } from '@material-ui/core';
import useStyles from './CreateContestStyles';
import TattoosGrid from './TattoosGrid';
import PrizeDateGrid from './PrizeDateGrid';
import TextInputForm from './TextInputForm';
import CreateContest from './CreateContest';
import { ContestContextProvider } from './ContestContext';

const TextFields = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography variant="h4" m={3} className={classes.title}>
        Create New Contest
      </Typography>

      <Container maxWidth="md">
        <Box boxShadow={3} className={classes.mainBox}>
          <Container className={classes.innerContainer}>
            <ContestContextProvider>
              <TextInputForm />
              <PrizeDateGrid />
              <TattoosGrid />
              <CreateContest />
            </ContestContextProvider>
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default TextFields;
