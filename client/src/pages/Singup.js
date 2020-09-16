import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core';
import UserContext from '../context/UserContext';

export default function Singup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (context.state.user) {
      history.push('/');
    }
  });
  const signUp = (e) => {
    e.preventDefault();
    if (!name && !email && !password) {
      return alert('Please enter all Fields');
    } else if (password !== rePassword) {
      return alert('Passwords do not Match');
    }
    context.handleSignUp(name, email, password);
  };
  return (
    <Paper style={{ margin: '3% 33%', textAlign: 'center', padding: '5%' }}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form noValidate>
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
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
        <Button
          style={{ margin: '5% 0', padding: '5%' }}
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
        <Grid container>
          <Grid item style={{ marginTop: '5%' }}>
            <Link to="/login" variant="body2">
              {'Already have an account? Sign in'}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
