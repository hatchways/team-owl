import React, { Fragment, useState, useEffect } from 'react';
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

  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/api/contest/5f6a8f01fdeb0e1ab02947c5');
      setData(res.data);
    }
    fetchData();
  }, []);

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
                            alt="Remy Sharp"
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
                    >
                      Submit Design
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Tabs data={data} />
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default ViewContest;
