import React from 'react';
import { Paper } from '@material-ui/core';
import TabPanelStyles from './TabPanelStyles';

export default function TabPanel(props) {
  const { value, index, contest, isPaper, Component, ...other } = props;
  const classes = TabPanelStyles();

  return (
    <>
      {isPaper ? (
        <Paper
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
          className={classes.paper}
        >
          {value === index && <Component value={value} contest={contest} />}
        </Paper>
      ) : (
        <>{value === index && <Component value={value} contest={contest} />}</>
      )}
    </>
  );
}
