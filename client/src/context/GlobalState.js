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
  });

  const handleLogout = () => {
    removeFromStorage('auth_Token');
    dispatch({ type: 'LOG_OUT' });
  };

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    if (data.token) {
      setInStorage('auth_Token', data.token);
      dispatch({
        type: 'LOG_IN',
        payload: { token: data.token, user: data.user },
      });
    } else {
      console.log('wrong email and password');
    }
  };

  const handleSignUp = async (name, email, password) => {
    await signUp(name, email, password);
    handleLogin(email, password);
  };

  useEffect(() => {
    const checkLogin = async () => {
      let token = getFromStorage('auth_Token') || '';
      const user = await verifyToken(token);
      if (user.data) {
        dispatch({ type: 'VERIFY_TOKEN', payload: { token, user: user.data } });
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
