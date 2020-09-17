import React, { useContext } from 'react';
import Nav from '../components/Nav';
import UserContext from '../context/UserContext';
import { Typography, Grid } from '@material-ui/core';

export default function Landing() {
  const context = useContext(UserContext);
  return (
    <>
      <Typography variant="h2">Home Page</Typography>
    </>
  );
}
