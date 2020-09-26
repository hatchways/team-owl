import React from 'react';
import { ContestContextProvider } from '../context/ContestContext';
import ViewContest from '../components/getContestComponents/ContestInfo';

const GetContest = () => {
  return (
    <ContestContextProvider>
      <ViewContest />
    </ContestContextProvider>
  );
};

export default GetContest;
