import React, { Fragment, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Link,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
} from '@material-ui/core';
import useStyles from './GetContestStyles';
import { ContestContext } from '../../context/ContestContext';
import Tabs from './Tabs';

const ViewContest = () => {
  const classes = useStyles();
  const context = useContext(ContestContext);

  const { contest } = context.state;

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    context.getContestById(params.id);
  }, [params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/contest/${params.id}/submission`);
  };

  const chooseWinner = (e) => {
    e.preventDefault();
    history.push(`/contest/${params.id}/winner`);
  };

  return (
    <Fragment>
      <Container maxWidth="md">
        <Box className={classes.infoBox}>
          <Container className={classes.innerContainer}>
            <Box mt={6}>
              <Link m={3} className={classes.navLinks}>
                {'<'} Back to list of contests
              </Link>
              <Box mt={4}>
                <Grid container spacing={4}>
                  <Grid item xs={8}>
                    <Typography className={classes.subtitle}>
                      {contest.title}&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className={classes.prizeStandout}>
                        ${contest.prize}
                      </span>
                    </Typography>
                    <Box mt={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={2}>
                          <Avatar
                            alt={contest.user && contest.user.name}
                            className={classes.navLinks}
                            src={contest.user && contest.user.avatar}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography className={classes.userName}>
                            By {contest.user && contest.user.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={4} align={'right'}>
                    <Button
                      variant={'outlined'}
                      className={classes.contestButton}
                      align={'right'}
                      onClick={(e) => onSubmit(e)}
                    >
                      Submit Design
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box mt={4}>
              <Typography>Time to Deadline: pending</Typography>
            </Box>
            <Tabs contestData={contest} />
            <Button
              variant={'outlined'}
              className={classes.contestButton}
              align={'right'}
              onClick={(e) => chooseWinner(e)}
            >
              Choose Winner
            </Button>
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ViewContest;
