import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalState from './context/GlobalState';
import { ContestContextProvider } from './context/ContestContext';
import UserState from './context/UserState';
import ConversationState from './context/ConversationState';

ReactDOM.render(
  <GlobalState>
    <ContestContextProvider>
      <UserState>
        <ConversationState>
          <App />
        </ConversationState>
      </UserState>
    </ContestContextProvider>
  </GlobalState>,
  document.getElementById('root')
);
