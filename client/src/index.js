import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalState from './context/GlobalState';
import { ContestContextProvider } from './context/ContestContext';

ReactDOM.render(
  <GlobalState>
    <ContestContextProvider>
      <App />
    </ContestContextProvider>
  </GlobalState>,
  document.getElementById('root')
);
