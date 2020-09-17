import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import ImgTest from './pages/ImgTest';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/imgtest" component={ImgTest} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
