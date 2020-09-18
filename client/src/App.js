import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import ImgTest from './pages/ImgTest';
import Contest from './pages/Contest';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/imgtest" component={ImgTest} />
          <Route exact path="/contest" component={Contest} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
