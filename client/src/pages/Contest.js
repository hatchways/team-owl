import 'date-fns';
import React, { Fragment } from 'react';
import Navbar from '../components/createContestComponents/Navbar';
import InputFields from '../components/createContestComponents/InputFields';

const Contest = () => {
  return (
    <Fragment>
      <Navbar />
      <InputFields />
    </Fragment>
  );
};

export default Contest;
