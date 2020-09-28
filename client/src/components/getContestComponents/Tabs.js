import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import { getFromStorage } from '../../helper/localStorage';

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

const SimpleTabs = ({ contestData }) => {
  const classes = useStyles();
  const params = useParams();

  const [value, setValue] = useState(0);
  const [imgData, setImgData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const token = getFromStorage('auth_token');

  useEffect(() => {
    const fetchImgData = async (contestId) => {
      const res = await axios.get(`/api/contestSub/${contestId}/submissions`, {
        headers: {
          auth_token: `Bearer ${token}`,
        },
      });
      setImgData(res.data);
    };
    fetchImgData(params.id);
  }, [params.id, token]);

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
            {imgData.map((img) => {
              return img.submissionPic.map((pic, i) => (
                <GridListTile key={i} cols={1} className={classes.gridListTile}>
                  <p className={classes.overlayText}>{img.user.name}</p>
                  <img src={pic} alt={pic} />
                </GridListTile>
              ));
            })}
            <Box></Box>
          </GridList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>{contestData.description}</Typography>
          <Box mt={3}>
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
              {contestData.contestPics &&
                contestData.contestPics.map((pic, i) => (
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
};

export default SimpleTabs;

// {contestData.user && contestData.user._id !== user._id
//   ? userSub.map((sub, i) => (
//       <GridListTile
//         key={i}
//         cols={1}
//         className={classes.gridListTile}
//       >
//         <img src={sub.submissionPic} alt={sub.submissionPic} />
//       </GridListTile>
//     ))
//   : contestData.submissions &&
//     contestData.submissions.map((sub) =>
//       sub.submissionPic.url.map((pic, i) => (
//         <GridListTile
//           key={i}
//           cols={1}
//           className={classes.gridListTile}
//         >
// <p className={classes.overlayText}>
//   {sub.submissionPic.name}
// </p>
//           <img src={pic} alt={pic} />
//         </GridListTile>
//       ))
//     )}
