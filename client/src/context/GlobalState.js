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
    isLoading: true,
    authed: false,
    contests: {
      created: [
        {
          title: 'Lion Tatto concept in minimal style',
          subtitle: 'Looking for cool simplicity ideas for Lion',
          prize: 150,
          id: 1,
          thumbnail: '0de773f98a983912282d4a303e355329d5f592da.png',
        },
        {
          title: 'Lightning in a bolt',
          subtitle: 'Looking for an inspirational lightning image ',
          prize: 300,
          id: 2,
          thumbnail: 'c91c45b97085fa64186472d903c1d1ef475d14d1.png',
        },
      ],
      submitted: {},
    },
  });

  const handleLogout = () => {
    dispatch({ type: 'IS_LOADING' });
    removeFromStorage('auth_token');
    dispatch({ type: 'LOG_OUT' });
  };

  const handleLogin = async (email, password) => {
    dispatch({ type: 'IS_LOADING', payload: true });
    const user = await login(email, password);
    if (user.token) {
      setInStorage('auth_token', user.token);
      dispatch({
        type: 'LOG_IN',
        payload: { token: user.token, user: user.user, isLoading: false },
      });
    } else {
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: user.msg, isLoading: false },
      });
    }
  };

  const handleSignUp = async (name, email, password, rePassword) => {
    dispatch({ type: 'IS_LOADING', payload: true });
    if (password !== rePassword) {
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: 'Passwords Do not Match' },
      });
      return;
    }
    let user = await signUp(name, email, password);
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
      if (!user.msg) {
        setTimeout(() => {
          dispatch({
            type: 'VERIFY_TOKEN',
            payload: { token, user: user, isLoading: false },
          });
        }, 1000);
      } else {
        dispatch({ type: 'IS_LOADING', payload: false });
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
