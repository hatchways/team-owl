import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './themes/theme';
import Nav from './components/Nav';
import LandingPage from './pages/Landing';
import LoginSignup from './pages/LoginSignup';
import ImgTest from './pages/ImgTest';
import Contest from './pages/Contest';
import GetContest from './pages/GetContest';

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
            <Route exact path="/imgtest" component={ImgTest} />
          <Route exact path="/contest" component={Contest} />
          <Route
            exact
            path="/contest/5f67e4c59f50f3070e5cceb8"
            component={GetContest}
          />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
