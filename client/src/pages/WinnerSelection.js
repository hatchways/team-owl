import React from 'react';
import { ContestContextProvider } from '../context/ContestContext';
import PickWinner from '../components/pickWinnerComponents/PickWinner';

const WinnerSelection = () => {
  return (
    <ContestContextProvider>
      <PickWinner />
    </ContestContextProvider>
  );
};

export default WinnerSelection;
