import React from 'react';
import { Paper } from '@material-ui/core';
import TabPanelStyles from './TabPanelStyles';

export default function TabPanel(props) {
  const { value, index, contests, Component, submitted, ...other } = props;
  const classes = TabPanelStyles();
  const cardsJSX = contests.map((contest) => {
    let newContest;
    submitted ? (newContest = contest.contest) : (newContest = contest);
    return <Component key={newContest._id} value={value} contest={newContest} />;
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
