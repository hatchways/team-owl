import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContestContextProvider } from './context/ContestContext';
import UserState from './context/UserState';
import ConversationState from './context/ConversationState';

ReactDOM.render(
  <ContestContextProvider>
    <UserState>
      <ConversationState>
        <App />
      </ConversationState>
    </UserState>
  </ContestContextProvider>,
  document.getElementById('root')
);
