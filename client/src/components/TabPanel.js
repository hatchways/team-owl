import React from 'react';
import { Paper } from '@material-ui/core';
import TabPanelStyles from './TabPanelStyles';

export default function TabPanel(props) {
  const { value, index, contests, Component, ...other } = props;
  const classes = TabPanelStyles();
  const cardsJSX = contests.map((contest, i) => {
    return <Component key={contest.id || 1} value={value} contest={contest} />;
  });

  return (
    <Paper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.paper}
    >
      {cardsJSX}
    </Paper>
  );
}
