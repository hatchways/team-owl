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
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={5}>
            <Grid container item xs={6} alignContent="center">
              <Link to="/" className={classes.logo}>
                <Typography variant="subtitle1">TATTO ART</Typography>
              </Link>
            </Grid>
            <Grid container item xs={6} justify="flex-end">
              {context.state.user ? (
                <Button
                  onClick={() => {
                    context.handleLogout();
                  }}
                  size="large"
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                >
                  <Typography variant="button">LogOut</Typography>
                </Button>
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