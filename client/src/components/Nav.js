import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import useNavCss from './NavStyles';

export default function Nav() {
  const context = useContext(UserContext);
  const classes = useNavCss();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid container item xs={4} alignContent="center">
              <Link to="/" className={classes.logo}>
                <Typography variant="subtitle1">TATTO ART</Typography>
              </Link>
            </Grid>
            <Grid container item xs={8} justify="flex-end">
              {context.state.user ? (
                <>
                  <Button
                    component={Link}
                    to="/contest"
                    size="large"
                    color="primary"
                    className={classes.button}
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
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Messages
                    </Typography>
                  </Button>
                  <Button
                    component={Link}
                    to="/profile"
                    size="large"
                    color="primary"
                    className={classes.button}
                  >
                    <Typography variant="button" className={classes.buttonText}>
                      Profile
                    </Typography>
                  </Button>
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
