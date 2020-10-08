import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserState from './context/UserState';
import ConversationState from './context/ConversationState'

ReactDOM.render(
  <UserState>
    <ConversationState>
      <App />
    </ConversationState>
  </UserState>,
  document.getElementById('root'),
);
