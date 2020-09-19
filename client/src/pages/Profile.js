import React, { useContext } from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  Button,
  Paper,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import useProfileStyles from './Profile_Css';
import UserContext from '../context/UserContext';
import avImage from '../assets/7c0c914fd9b8665800d4f0e4cc8e01c7042aaea8.png';

export default function Profile() {
  const classes = useProfileStyles();
  const context = useContext(UserContext);
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container direction="column" justify="center" alignContent="center">
      <Grid container item className={classes.grid}>
        <Grid container item justify="center" alignContent="center">
          <Avatar alt="Remy Sharp" src={avImage} className={classes.avatar} />
        </Grid>
        <Grid container item justify="center" alignContent="center">
          <Typography variant="h5" className={classes.name}>
            {context.state.user.name}
          </Typography>
        </Grid>
        <Grid container item justify="center" alignContent="center">
          <Button
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
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="My Contest" />
          <Tab label="Submitted Contest" />
        </Tabs>
        <Paper className={classes.root}></Paper>
      </Grid>
    </Grid>
  );
}
