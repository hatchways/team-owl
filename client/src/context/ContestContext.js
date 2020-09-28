import React, { createContext, useState, useReducer } from 'react';
import axios from 'axios';
import { contestReducer } from './contestReducers';
import { getFromStorage } from '../helper/localStorage';

export const ContestContext = createContext();

export const ContestContextProvider = ({ children }) => {
  //TextInputForm
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //PrizeDateGrid
  const date = Date.now();
  const [selectedDate, setSelectedDate] = useState(date);
  const [prize, setPrize] = useState(100);
  //TattoosGrid
  const [pics, setPics] = useState([]);
  //Snackbar
  const [state, dispatch] = useReducer(contestReducer, {
    toast: { open: false, message: '' },
    contest: {},
    isLoading: true,
  });

  const token = getFromStorage('auth_token');

  const alertFn = (message) => {
    dispatch({
      type: 'TOAST',
      payload: { open: true, message: message, isLoading: false },
    });
  };

  const getContestById = async (contestId) => {
    const res = await axios
      .get(`/api/contest/${contestId}`, {
        headers: {
          auth_token: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });
    const contest = res.data;
    contest &&
      dispatch({
        type: 'GET_CONTEST_BY_ID',
        payload: { contest: contest, isLoading: false },
      });
  };

  return (
    <ContestContext.Provider
      value={{
        title,
        description,
        selectedDate,
        prize,
        pics,
        state,
        setTitle,
        setDescription,
        setSelectedDate,
        setPrize,
        setPics,
        alertFn,
        dispatch,
        getContestById,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};
