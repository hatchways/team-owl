import React from 'react';
import { Grid, Tabs, Tab } from '@material-ui/core';
import EditProfileStyles from './EditProfileStyles';
// import UserContext from '../context/UserContext';
import TabPanel from '../components/TabPanel';
import UserInfo from './UserInfo';
import Payments from './Payments';

export default function Profile() {
  const classes = EditProfileStyles();
  const [value, setValue] = React.useState(0);
  // const context = useContext(UserContext);
  // const { contests } = context.state;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container className={classes.grid} alignContent="flex-start">
      <Grid item xs={2}>
        <Tabs
          indicatorColor="primary"
          orientation="vertical"
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab
            label="User Info"
            id="vertical-tab-0"
            aria-controls="vertical-tabpanel-0"
            className={classes.tab}
          />
          <Tab
            label="Payment"
            id="vertical-tab-1"
            aria-controls="vertical-tabpanel-1"
            className={classes.tab}
          />
          <Tab
            label="Settings"
            id="vertical-tab-2"
            aria-controls="vertical-tabpanel-2"
            className={classes.tab}
          />
          <Tab
            label="Security"
            id="vertical-tab-3"
            aria-controls="vertical-tabpanel-3"
            className={classes.tab}
          />
        </Tabs>
      </Grid>
      <Grid item xs={10}>
        <TabPanel
          value={value}
          index={0}
          isPaper={false}
          Component={UserInfo}
        />
        <TabPanel
          value={value}
          index={1}
          isPaper={false}
          Component={Payments}
        />
        <TabPanel
          value={value}
          index={2}
          isPaper={false}
          Component={UserInfo}
        />
        <TabPanel
          value={value}
          index={3}
          isPaper={false}
          Component={UserInfo}
        />
      </Grid>
    </Grid>
  );
}
