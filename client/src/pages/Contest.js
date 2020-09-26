import React from 'react';
import { ContestContextProvider } from '../context/ContestContext';
import InputFields from '../components/createContestComponents/InputFields';

const Contest = () => {
  return (
    <ContestContextProvider>
      <InputFields />
    </ContestContextProvider>
  );
};

export default Contest;
