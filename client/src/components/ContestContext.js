import React, { createContext, useState } from 'react';

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

  return (
    <ContestContext.Provider
      value={{
        title,
        description,
        selectedDate,
        prize,
        pics,
        setTitle,
        setDescription,
        setSelectedDate,
        setPrize,
        setPics,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};
