import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import useNavCss from './NavStyles';

export default function Nav() {
  const [isProfile, setIsProfile] = useState(false);
  const context = useContext(UserContext);
  const classes = useNavCss();
  const { user } = context.state;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/profile') {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
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
                    color="primary"
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
                    color="primary"
                    className={classes.button}
                    disableRipple
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Messages
                    </Typography>
                  </Button>
                  <Button
                    component={Link}
                    to=""
                    size="large"
                    color="primary"
                    className={classes.button}
                    disableRipple
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Notification
                    </Typography>
                  </Button>
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
                      color="primary"
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
                    color="primary"
                    className={classes.button}
                  >
                    <Typography variant="button">Login</Typography>
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    size="large"
                    variant="outlined"
                    color="primary"
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
