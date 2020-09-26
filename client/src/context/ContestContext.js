import React, { createContext, useState, useReducer } from 'react';
import { contestReducer } from './contestReducers';

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
  });

  const alertFn = (message) => {
    dispatch({
      type: 'TOAST',
      payload: { open: true, message: message },
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
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};
