import React, { useReducer, useEffect } from 'react';
import UserContext from '../context/UserContext';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage,
} from '../helper/localStorage';
import { verifyToken, login, signUp } from '../helper/Fetch';
import { userReducer } from './reducers';

const GlobalState = (props) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: undefined,
    token: undefined,
    toast: { open: false, message: '' },
  });

  const handleLogout = () => {
    removeFromStorage('auth_token');
    dispatch({ type: 'LOG_OUT' });
  };

  const handleLogin = async (email, password) => {
    const user = await login(email, password);
    if (user.token) {
      setInStorage('auth_token', user.token);
      dispatch({
        type: 'LOG_IN',
        payload: { token: user.token, user: user.user },
      });
    } else {
      dispatch({ type: 'TOAST', payload: { open: true, message: user.msg } });
    }
  };

  const handleSignUp = async (name, email, password, rePassword) => {
    if (password !== rePassword) {
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: 'Passwords Do not Match' },
      });
      return;
    }
    const user = await signUp(name, email, password);
    if (user.name) {
      handleLogin(email, password);
    } else {
      dispatch({ type: 'TOAST', payload: { open: true, message: user.msg } });
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      let token = getFromStorage('auth_token') || '';
      const user = await verifyToken(token);
      if (!user.error) {
        dispatch({ type: 'VERIFY_TOKEN', payload: { token, user: user } });
      } else {
        console.log(user.error.message);
      }
    };
    checkLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ state, handleLogout, handleLogin, handleSignUp }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default GlobalState;