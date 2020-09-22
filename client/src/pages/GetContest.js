import React, { Fragment } from 'react';
import Navbar from '../components/createContestComponents/Navbar';
import ViewContest from '../components/getContestComponents/ContestInfo';

const GetContest = () => {
  return (
    <Fragment>
      <Navbar />
      <ViewContest />
    </Fragment>
  );
};

export default GetContest;
