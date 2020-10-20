import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
} from '@material-ui/core';
import useStyles from './GetContestStyles';
import { ContestContext } from '../../context/ContestContext';
import Tabs from './Tabs';
import ConversationContext from '../../context/ConversationContext';
import { convertMS } from '../../helper/CountDown';
import UserState from '../../context/UserContext';

const ViewContest = () => {
  const classes = useStyles();
  const context = useContext(ContestContext);
  const userContext = useContext(UserState);
  const { contest } = context.state;
  const { user } = userContext.state;
  const conversationContext = useContext(ConversationContext);
  const { getNewConversation } = conversationContext;

  const dateNow = Date.now();

  const [date, setDate] = useState(dateNow);

  const deadlineJS = new Date(contest.deadline);
  const deadlineEpoch = deadlineJS.getTime();
  const timeTilDeadlineEpoch = deadlineEpoch - date;
  const countDown = convertMS(timeTilDeadlineEpoch);

  const params = useParams();
  const history = useHistory();

  // console.log(user._id);
  // console.log(contest.user._id);

  setTimeout(() => {
    setDate(dateNow);
  }, 1000);

  useEffect(() => {
    context.getContestById(params.id);
  }, [params.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/contest/${params.id}/submission`);
  };

  const messageMe = (e) => {
    e.preventDefault();
    history.push('/messages');
    getNewConversation(contest.user._id);
  };
  return (
    <Fragment>
      <Container maxWidth="md">
        <Box className={classes.infoBox}>
          <Container className={classes.innerContainer}>
            <Box mt={6}>
              <Link to="/" m={3} className={classes.navLinks}>
                {'<'} Back to list of contests
              </Link>
              <Box mt={4}>
                <Grid container spacing={4}>
                  <Grid item xs={5}>
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
                  <Grid item xs={7} align={'right'}>
                    <Button
                      variant={'outlined'}
                      className={classes.contestButton}
                      align={'right'}
                      onClick={(e) => messageMe(e)}
                    >
                      Message
                    </Button>
                    {deadlineEpoch > dateNow &&
                    user._id !== contest.user._id ? (
                      <Button
                        variant={'outlined'}
                        className={classes.contestButton}
                        align={'right'}
                        onClick={(e) => onSubmit(e)}
                      >
                        Submit Design
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box mt={4}>
              {deadlineEpoch > dateNow ? (
                <Typography>
                  Time to Deadline: {countDown ? countDown : null}
                </Typography>
              ) : (
                <Typography>Deadline Passed</Typography>
              )}
            </Box>
            <Tabs contestData={contest} />
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ViewContest;
