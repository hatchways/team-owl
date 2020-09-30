import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Button, Tabs, Tab, Typography } from '@material-ui/core';
import TabPanel from '../components/TabPanel';
import ContestCardPanel from '../components/ContestCardPanel';
import useProfileStyles from './ProfileStyles';
import UserContext from '../context/UserContext';
//import { ContestContext } from '../context/ContestContext';

export default function Profile() {
  const classes = useProfileStyles();
  const [value, setValue] = React.useState(0);
  const context = useContext(UserContext);
  //const contestContext = useContext(ContestContext);
  const { contests, user } = context.state;
  user.profileImage = '7c0c914fd9b8665800d4f0e4cc8e01c7042aaea8.png';
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    context.getAllContestsByUser();
  }, []);

  return (
    <Grid container direction="column" justify="center" alignContent="center">
      <Grid container item className={classes.grid}>
        <Grid container item justify="center" alignContent="center">
          <Avatar
            alt="Remy Sharp"
            src="https://team-owl-tattoo.s3.ca-central-1.amazonaws.com/userAvatar/avatarplaceholder.png"
            className={classes.avatar}
          />
        </Grid>
        <Grid container item justify="center" alignContent="center">
          <Typography variant="h5" className={classes.name}>
            {user.name}
          </Typography>
        </Grid>
        <Grid container item justify="center" alignContent="center">
          <Button
            component={Link}
            to="/edit_profile"
            size="large"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            <Typography variant="button" className={classes.button}>
              Edit Profile
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid item className={classes.grid}>
        <Tabs
          TabIndicatorProps={{
            style: {
              height: '4px',
            },
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          <Tab label="My Contest" className={classes.tab} />
          <Tab label="Submitted Contest" className={classes.tab} />
        </Tabs>
        {value === 0 ? (
          <TabPanel
            value={0}
            index={0}
            contests={contests.created}
            Component={ContestCardPanel}
          />
        ) : (
          <TabPanel
            value={1}
            index={1}
            contests={contests.submitted}
            Component={ContestCardPanel}
          />
        )}
      </Grid>
    </Grid>
  );
}
