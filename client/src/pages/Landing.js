import React, { useContext } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Login from './Login';
import Signup from './Singup';
import UserContext from '../context/UserContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';

export default function Landing() {
  const context = useContext(UserContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="subtitle1"
            style={{ letterSpacing: '0.75rem', fontWeight: '300' }}
          >
            TATTO ART
          </Typography>
          {context.state.user ? (
            <Button
              onClick={() => {
                context.handleLogout();
              }}
              size="large"
              variant="outlined"
              style={{ position: 'absolute', right: '5%' }}
            >
              <Typography style={{ color: '#f4f4f4' }} variant="h6">
                LogOut
              </Typography>
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                size="large"
                variant="outlined"
                style={{ position: 'absolute', right: '15%' }}
              >
                <Typography style={{ color: '#f4f4f4' }} variant="button">
                  Login
                </Typography>
              </Button>
              <Button
                component={Link}
                to="/signup"
                size="large"
                variant="outlined"
                style={{ position: 'absolute', right: '5%' }}
              >
                <Typography style={{ color: '#f4f4f4' }} variant="button">
                  Signup
                </Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Grid>
              {context.state.user ? (
                <Typography
                  variant="h3"
                  style={{ textAlign: 'center', margin: '5%' }}
                >
                  Login Success
                </Typography>
              ) : (
                <Typography
                  variant="h3"
                  style={{ textAlign: 'center', margin: '5%' }}
                >
                  Login to continue
                </Typography>
              )}
            </Grid>
          )}
        />
        <Route path="/login" render={() => <Login />} />
        <Route path="/signup" render={() => <Signup />} />
      </Switch>
    </>
  );
}
