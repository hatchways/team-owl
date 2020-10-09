import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import useNavStyles from './NavStyles';
import Notifications from './Notifications';

export default function Nav() {
  const [isProfile, setIsProfile] = useState(false);
  const context = useContext(UserContext);
  const { user } = context.state;
  const classes = useNavStyles();
  const location = useLocation();

  useEffect(() => {
    setIsProfile(location.pathname === '/profile');
  }, [location]);
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid container item xs={3} alignContent="center">
              <Link to="/" className={classes.logo}>
                <Typography variant="subtitle1">TATTO ART</Typography>
              </Link>
            </Grid>
            <Grid container item xs={9} justify="flex-end">
              {context.state.user ? (
                <>
                  <Button
                    component={Link}
                    to="/contest"
                    size="large"
                    color="secondary"
                    className={classes.button}
                    disableRipple
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Create Contest
                    </Typography>
                  </Button>
                  <Button
                    component={Link}
                    to="/messages"
                    size="large"
                    color="secondary"
                    className={classes.button}
                    disableRipple
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Messages
                    </Typography>
                  </Button>
                  <Notifications />
                  {!isProfile ? (
                    <IconButton
                      component={Link}
                      to="/profile"
                      className={classes.avatar}
                    >
                      <Avatar src={user.avatar} />
                    </IconButton>
                  ) : (
                    <Button
                      onClick={() => {
                        context.handleLogout();
                      }}
                      component={Link}
                      to="/"
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      disableRipple
                    >
                      <Typography variant="button">LogOut</Typography>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    size="large"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <Typography variant="button">Login</Typography>
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    size="large"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    <Typography variant="button">Signup</Typography>
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
