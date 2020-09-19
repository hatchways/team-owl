import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Grid, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './themes/theme';
import Nav from './components/Nav';
import LandingPage from './pages/Landing';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import UserContext from './context/UserContext';

const App = () => {
  const context = useContext(UserContext);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {context.state.isLoading ? (
          <Grid
            container
            justify="center"
            alignContent="center"
            style={{ height: '100vh' }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Nav />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                path="/login"
                render={() => <LoginSignup isSignIn={true} />}
              />
              <Route
                path="/signup"
                render={() => <LoginSignup isSignIn={false} />}
              />
              <Route path="/Profile" render={() => <Profile />} />
            </Switch>
          </>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
