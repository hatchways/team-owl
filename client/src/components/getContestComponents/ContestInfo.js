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
import Tabs from './Tabs';

const ViewContest = () => {
  const classes = useStyles();
  const dateNow = Date.now();
  const [data, setData] = useState({});
  const [date, setDate] = useState(dateNow);

  setTimeout(() => {
    setDate(dateNow);
  }, 1000);

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData(contestId) {
      const res = await axios.get(`/api/contest/${contestId}`);
      setData(res.data);
    }
    fetchData(params.id);
  }, [params.id]);

  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return d + ' days, ' + h + ' hours, ' + m + ' minutes';
  }

  const deadlineJS = new Date(data.deadline);
  const deadlineEpoch = deadlineJS.getTime();
  const timeTilDeadlineEpoch = deadlineEpoch - date;
  const countDown = convertMS(timeTilDeadlineEpoch);

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
                      onClick={() =>
                        history.push(`/contest/${params.id}/submission`)
                      }
                    >
                      Submit Design
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box mt={4}>
              {/* <Typography>Deadline: {data.deadline}</Typography>
              <Typography>Deadline Epoch: {deadlineEpoch}</Typography> */}
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
