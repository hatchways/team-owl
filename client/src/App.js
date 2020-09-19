import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './themes/theme';
import Nav from './components/Nav';
import LandingPage from './pages/Landing';
import LoginSignup from './pages/LoginSignup';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" render={() => <LoginSignup isSignIn={true} />} />
          <Route
            path="/signup"
            render={() => <LoginSignup isSignIn={false} />}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
