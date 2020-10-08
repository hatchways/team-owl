import React, { useReducer, useEffect } from 'react';
import UserContext from './UserContext';
import {
  getFromStorage,
  setInStorage,
  removeFromStorage,
} from '../helper/localStorage';
import {
  verifyToken,
  login,
  signUp,
  fetchAllContest,
  fetchAllContestByUserId,
  uploadAvatar,
} from '../helper/Fetch';
import { userReducer } from './UserReducers';

const UserState = (props) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: undefined,
    token: undefined,
    toast: { open: false, message: '' },
    isLoading: true,
    authed: false,
    contests: {
      created: [],
      submitted: [],
    },
    allContests: [],
  });

  const handleLogout = () => {
    dispatch({ type: 'IS_LOADING', payload: true });
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
      console.log('password');
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: 'Passwords Do not Match' },
      });
      return;
    }
    let user = await signUp(name, email, password);
    if (user.user.name) {
      handleLogin(email, password);
    } else {
      dispatch({ type: 'TOAST', payload: { open: true, message: user.msg } });
    }
  };

  // change the profile avatar
  const changeAvatar = async (file) => {
    dispatch({ type: 'IS_LOADING', payload: true });
    const formData = new FormData();
    formData.append('avatar', file);
    const user = await uploadAvatar(formData, state.token, state.user._id);
    if (user) {
      dispatch({
        type: 'UPDATE_USER',
        payload: user,
      });
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: 'Upload Succesfull', isLoading: false },
      });
    } else {
      dispatch({
        type: 'TOAST',
        payload: { open: true, message: user.msg, isLoading: false },
      });
    }
  };

  // get all contest
  useEffect(() => {
    dispatch({ type: 'IS_LOADING', payload: true });
    const getAllContests = async () => {
      const contests = await fetchAllContest();
      contests && dispatch({ type: 'ALL_CONTESTS', payload: { contests } });
    };

    const checkLogin = async () => {
      let token = getFromStorage('auth_token') || '';
      if (token) {
        const user = await verifyToken(token);
        if (!user.msg) {
          dispatch({
            type: 'VERIFY_TOKEN',
            payload: { token, user: user, isLoading: false },
          });
        } else {
          dispatch({ type: 'IS_LOADING', payload: false });
        }
      }
    };

    checkLogin();
    getAllContests();
  }, []);

  // get all contests and submission by userID
  useEffect(() => {
    if (state.user && state.user._id && state.token) {
      const getAllContestByUserId = async () => {
        const contests = await fetchAllContestByUserId(
          state.user._id,
          state.token,
        );
        if (contests) {
          dispatch({ type: 'USER_CONTESTS', payload: contests });
        }
      };
      getAllContestByUserId();
    }
  }, [state.user, state.token]);

  return (
    <UserContext.Provider
      value={{ state, handleLogout, handleLogin, handleSignUp, changeAvatar }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
