import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import useNavCss from './Nav_Css';

export default function Nav() {
  const context = useContext(UserContext);
  const classes = useNavCss();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={5}>
            <Grid container item xs={7} alignContent="center">
              <Typography variant="subtitle1" className={classes.logo}>
                TATTO ART
              </Typography>
            </Grid>
            <Grid container item xs={5} justify="flex-end">
              {context.state.user ? (
                <Button
                  onClick={() => {
                    context.handleLogout();
                  }}
                  size="large"
                  variant="outlined"
                  className={classes.button}
                >
                  <Typography style={{ color: '#f4f4f4' }} variant="button">
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
                    className={classes.button}
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
                    className={classes.button}
                  >
                    <Typography style={{ color: '#f4f4f4' }} variant="button">
                      Signup
                    </Typography>
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
