import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  GridList,
  GridListTile,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import useStyles from './GetContestStyles';
import { getFromStorage } from '../../helper/localStorage';
import UserContext from '../../context/UserContext';
import { ContestContext } from '../../context/ContestContext';
import IsLoading from '../IsLoading';
import { TabPanel, a11yProps } from './TabPanel';
import Alert from '../createContestComponents/Alert';

const SimpleTabs = ({ contestData }) => {
  const token = getFromStorage('auth_token');
  const header = {
    headers: {
      auth_token: `Bearer ${token}`,
    },
  };
  const classes = useStyles();
  const params = useParams();

  const userContext = useContext(UserContext);
  const contestContext = useContext(ContestContext);

  const { user } = userContext.state;
  const { contest } = contestContext.state;

  const { alertFn } = contestContext;

  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    const fetchImgData = async (contestId) => {
      const res = await axios.get(
        `/api/contestSub/${contestId}/submissions`,
        header
      );
      setImgData(res.data);
    };
    fetchImgData(params.id);
  }, [params.id, token]);

  const [value, setValue] = useState(0);
  const [imgData, setImgData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = (img) => {
    setSelectedTile(img);
  };

  const handleClose = () => {
    setSelectedTile(null);
    setOpen(false);
  };

  const toDecide = () => {
    setOpen(true);
  };

  const toDecideFinal = async (user, contest) => {
    const userId = user._id;
    const contestPrize = contest.prize;
    const res = await axios.post(
      '/api/v1/payment_intents/',
      { winnerId: userId, amount: contestPrize },
      header
    );
    const data = res.data;
    //console.log(data);
    alertFn(
      `You have chosen ${selectedTile.user.name} as the winner! The contest prize has been awarded to ${selectedTile.user.name}.`
    );
    handleClose();
    setOpen(false);
  };

  const dateNow = Date.now();
  const deadlineJS = new Date(contest.deadline);
  const deadlineEpoch = deadlineJS.getTime();

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
        <Alert />
        <TabPanel value={value} index={0}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {imgData.map((img) => {
              return img.submissionPic.map((pic, i) => {
                return !contest.user ? (
                  IsLoading()
                ) : user._id !== contest.user._id ? (
                  <GridListTile
                    key={pic}
                    cols={1}
                    className={classes.gridListTile}
                  >
                    <p className={classes.overlayText}>{img.user.name}</p>
                    <img src={pic} alt={pic} />
                  </GridListTile>
                ) : (
                  <GridListTile
                    key={pic}
                    cols={1}
                    className={classes.gridListTile}
                    onClick={() => handleClickOpen(img)}
                  >
                    <p className={classes.overlayText}>{img.user.name}</p>
                    <img src={pic} alt={pic} />
                  </GridListTile>
                );
              });
            })}
          </GridList>
        </TabPanel>
        <Dialog
          open={selectedTile !== null}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {deadlineEpoch < dateNow ? (
            <DialogTitle id="alert-dialog-title">
              Choose this design as winner?
            </DialogTitle>
          ) : null}
          <DialogContent>
            {selectedTile &&
              selectedTile.submissionPic.map((pic, i) => {
                return <img src={pic} key={i} alt={pic} />;
              })}
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.decisionButton}
              onClick={handleClose}
              color="primary"
            >
              Close
            </Button>
            {deadlineEpoch < dateNow ? (
              <Button
                className={classes.decisionButton}
                variant="contained"
                onClick={() => toDecide(selectedTile && selectedTile.user.name)}
                color="primary"
                autoFocus
              >
                Choose {selectedTile && selectedTile.user.name}
              </Button>
            ) : null}
          </DialogActions>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box pl={4} pr={4} pb={4} pt={2}>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogContentText>
                We will debit ${contest && contest.prize} plus applicable fees
                from your credit card to{' '}
                {selectedTile && selectedTile.user.name}.
              </DialogContentText>
              <Button variant="contained" onClick={handleClose} color="primary">
                No I'm not sure.
              </Button>
              <Button
                className={classes.decisionButton}
                variant="contained"
                color="primary"
                onClick={() =>
                  toDecideFinal(
                    selectedTile && selectedTile.user,
                    contest && contest
                  )
                }
                autoFocus
              >
                Choose {selectedTile && selectedTile.user.name}
              </Button>
            </Box>
          </Dialog>
        </Dialog>
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
