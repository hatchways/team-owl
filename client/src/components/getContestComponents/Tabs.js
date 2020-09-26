import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  GridList,
  GridListTile,
} from '@material-ui/core';
import useStyles from './GetContestStyles';
import UserContext from '../../context/UserContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs({ data }) {
  const classes = useStyles();
  const context = useContext(UserContext);
  const { user } = context.state;

  const [value, setValue] = useState(0);
  //const [dataProp, setDataProp] = useState(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);

  // useEffect(() => {
  //   setDataProp(data);
  // });

  //already have: {data}: this contest. data.submissions - all subs under this contest
  //already have: {user}: user ID from context.state

  //need to get: all subs under this contest under this user
  //to get above, make axios call '/:contestId/submissions/me' - I think that's it

  return (
    <Box mt={3}>
      <AppBar position="static" className={classes.tabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          indicatorColor="primary"
        >
          <Tab
            label="Designs"
            {...a11yProps(0)}
            className={classes.tabLabels}
          />
          <Tab label="Brief" {...a11yProps(1)} className={classes.tabLabels} />
        </Tabs>
      </AppBar>
      <Box boxShadow={4} mb={8}>
        <TabPanel value={value} index={0}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {data.submissions ? (
              data.user._id === user._id ? (
                data.submissions.map((sub) =>
                  sub.submissionPic.url.map((pic, i) => (
                    <GridListTile
                      key={i}
                      cols={1}
                      className={classes.gridListTile}
                    >
                      <p className={classes.overlayText}>
                        {sub.submissionPic.name}
                      </p>
                      <img src={pic} alt={pic} />
                    </GridListTile>
                  ))
                )
              ) : (
                data.submissions
                  .filter((sub) => sub.user === user._id)
                  .map((pic) =>
                    pic.submissionPic.url.map((pic, i) => (
                      <GridListTile
                        key={i}
                        cols={1}
                        className={classes.gridListTile}
                      >
                        <img src={pic} alt={pic} />
                      </GridListTile>
                    ))
                  )
              )
            ) : (
              <Box>
                <Typography>hello</Typography>
              </Box>
            )}
          </GridList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>{data.description}</Typography>
          <Box mt={3}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {data.contestPics &&
                data.contestPics.map((pic, i) => (
                  <GridListTile
                    key={i}
                    cols={1}
                    className={classes.gridListTile}
                  >
                    <img src={pic} alt={pic} />
                  </GridListTile>
                ))}
            </GridList>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}
