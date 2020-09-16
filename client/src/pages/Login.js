import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core';
import UserContext from '../context/UserContext';

export default function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (context.state.user) {
      history.push('/');
    }
  });
  const login = (e) => {
    e.preventDefault();
    context.handleLogin(email, password);
  };

  return (
    <Paper style={{ margin: '5% 33%', textAlign: 'center', padding: '5%' }}>
      <Typography variant="h4" gutterBottom>
        Sign in
      </Typography>
      <form noValidate>
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
        <Button
          style={{ margin: '5% 0', padding: '5%' }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item style={{ marginTop: '10%' }}>
            <Link to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
