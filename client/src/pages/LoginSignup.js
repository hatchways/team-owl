import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from '../components/Toast';
import UserContext from '../context/UserContext';
import LoginSignupStyles from './LoginSignupStyles';
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core';

export default function LoginSignup(props) {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();
  const classes = LoginSignupStyles();
  const isSignIn = props.isSignIn;

  useEffect(() => {
    if (context.state.user) {
      history.push('/');
    }
  });
  const login = (e) => {
    e.preventDefault();
    context.handleLogin(email, password);
  };

  const signUp = (e) => {
    e.preventDefault();
    context.handleSignUp(name, email, password, rePassword);
  };
  return (
    <Grid container justify="center" alignContent="center">
      <Paper className={classes.loginPaper}>
        <Typography variant="h4" gutterBottom className={classes.loginTitle}>
          {isSignIn ? 'Sign in' : 'Sign Up'}
        </Typography>
        <form noValidate>
          {!isSignIn && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <TextField
            variant="outlined"
            margin="normal"
            value={email}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus={false}
            color="primary"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={password}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          {!isSignIn && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Re-enter password"
              label="Re-enter Password"
              type="password"
              id="Re-enter password"
              autoComplete="current-password"
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
            />
          )}
          {isSignIn ? (
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              onClick={login}
            >
              Sign In
            </Button>
          ) : (
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                signUp(e);
              }}
            >
              Sign Up
            </Button>
          )}
        </form>
      </Paper>
      <Toast message={context.state.toast.message} />
    </Grid>
  );
}
