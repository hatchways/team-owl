import React from 'react';
import { ContestContextProvider } from '../context/ContestContext';
import SubmissionUpload from '../components/createSubmissionComponents/SubmissionUpload';

const CreateSubmission = () => {
  return (
    <ContestContextProvider>
      <SubmissionUpload />
    </ContestContextProvider>
  );
};

export default CreateSubmission;
