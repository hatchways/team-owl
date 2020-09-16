import React, { useState, useEffect } from 'react';
import UserContext from '../context/UserContext';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage,
} from '../helper/localStorage';
import { verifyToken, login, signUp } from '../helper/Fetch';

const GlobalState = (props) => {
  const [state, setState] = useState({ user: undefined });

  const handleLogout = () => {
    removeFromStorage('auth_Token');
    setState({ user: undefined });
  };

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    if (data.token) {
      setInStorage('auth_Token', data.token);
      setState({ user: data.user });
    } else {
      console.log('wrong email and password');
    }
  };

  const handleSignUp = async (name, email, password) => {
    await signUp(name, email, password);
    handleLogin(email, password);
  };

  useEffect(() => {
    let token = getFromStorage('auth_Token');
    if (token != null) {
      const checkLogin = async () => {
        const user = await verifyToken(token);
        setState({ user: user.data });
      };
      checkLogin();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ state, setState, handleLogout, handleLogin, handleSignUp }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default GlobalState;
