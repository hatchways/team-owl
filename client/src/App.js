import React, { useContext } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from './themes/theme';
import Nav from './components/Nav';
import LandingPage from './pages/Landing';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import UserContext from './context/UserContext';
import IsLoading from './components/IsLoading';
import PrivateRoute from './components/PrivateRoute';
import ImgTest from './pages/ImgTest';
import Contest from './pages/Contest';
import GetContest from './pages/GetContest';
import CreateSubmission from './pages/CreateSubmission';
import WinnerSelection from './pages/WinnerSelection';
import Messages from './pages/Messages';

const App = () => {
  const context = useContext(UserContext);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {context.state.isLoading ? (
          <IsLoading />
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
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/Profile"
                component={Profile}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/edit_profile"
                component={EditProfile}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/imgtest"
                component={ImgTest}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/contest"
                component={Contest}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/contest/:id"
                component={GetContest}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/contest/:id/submission"
                component={CreateSubmission}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/contest/:id/winner/"
                component={WinnerSelection}
              />
              <PrivateRoute
                authed={context.state.authed}
                exact
                path="/messages"
                component={Messages}
              />
            </Switch>
          </>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
