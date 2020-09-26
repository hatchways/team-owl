import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
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
import { convertMS } from '../../helper/CountDown';
import Tabs from './Tabs';

const ViewContest = () => {
  const classes = useStyles();
  const dateNow = Date.now();
  const [data, setData] = useState({}); //data is contest info from useEffect
  const [date, setDate] = useState(dateNow);

  const params = useParams();
  const history = useHistory();

  //let timer = setTimeout(() => setDate(dateNow), 1000);

  useEffect(() => {
    async function fetchData(contestId) {
      const res = await axios.get(`/api/contest/${contestId}`);
      setData(res.data);
    }
    fetchData(params.id);
  }, [params.id]);

  const deadlineJS = new Date(data.deadline);
  const deadlineEpoch = deadlineJS.getTime();
  const timeTilDeadlineEpoch = deadlineEpoch - date;
  const countDown = convertMS(timeTilDeadlineEpoch);

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/contest/${params.id}/submission`);
    //clearTimeout(timer);
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
                      {data.title}&nbsp;&nbsp;&nbsp;&nbsp;
                      <span className={classes.prizeStandout}>
                        ${data.prize}
                      </span>
                    </Typography>
                    <Box mt={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={2}>
                          <Avatar
                            alt={data.user && data.user.name}
                            className={classes.navLinks}
                            src={data.user && data.user.avatar}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography className={classes.userName}>
                            By {data.user && data.user.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={4} align={'right'}>
                    {' '}
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
              <Typography>Time to Deadline: {countDown}</Typography>
            </Box>
            <Tabs data={data} />
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ViewContest;
