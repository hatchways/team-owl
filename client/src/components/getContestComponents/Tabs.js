import React, { useState } from 'react';
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
import imgData from '../../imgDataS3';
import shortImgData from '../../imgDataS3/shortImgData';

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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);

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
            {imgData.map((tile) => (
              <GridListTile
                key={tile.img}
                cols={tile.cols || 1}
                className={classes.gridListTile}
              >
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box>
            <Typography>{data.description}</Typography>
            <Box mt={3}>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {data.contestPics &&
                  data.contestPics.map((pic, i) => (
                    <GridListTile
                      key={i}
                      cols={pic.cols || 1}
                      className={classes.gridListTile}
                    >
                      <img src={pic} alt={pic} />
                    </GridListTile>
                  ))}
              </GridList>
            </Box>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}
