import React, { useContext } from 'react';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import UserContext from '../context/UserContext';
import UserInfoStyles from './UserInfoStyles';
import { isPast, parseISO } from 'date-fns';

export default function UserInfo() {
  const classes = UserInfoStyles();
  const context = useContext(UserContext);
  const { changeAvatar } = context;
  const { user, contests } = context.state;

  const totalCreadted = contests.created.reduce((a, c) => {
    if (isPast(parseISO(c.deadline))) {
      return a + c.prize;
    }
    return a;
  }, 0);

  const handlechange = (e) => {
    e.preventDefault();
    const file = e.target.files;
    changeAvatar(file[0]);
  };

  return (
    <Grid
      container
      alignContent="space-between"
      className={classes.upperBorder}
    >
      <Box mb={5}>
        <Typography variant="h5">User Profile</Typography>
      </Box>
      <Grid container alignItems="center" justify="space-between">
        <input
          accept="image/*"
          className={classes.input}
          id="upload-file"
          type="file"
          onChange={(e) => {
            handlechange(e);
          }}
        />
        <label htmlFor="upload-file">
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            className={classes.avatar}
          />
        </label>
        <Box>
          <Box mr={2} fontSize="2rem" align="right">
            {user.name} <br />
          </Box>
          <Box mr={2} fontSize="1rem" align="right" color="secondary.dark">
            {user.email}
          </Box>
        </Box>
        <Typography variant="h6">
          <Box ml={2} align="right" color="secondary.dark">
            <b>{contests.created.length}</b> Contests Created <br />
            <b>0</b> Complete <br />
            <b>{contests.created.length}</b> Ongoing
          </Box>{' '}
        </Typography>
        <Typography variant="h6">
          <Box ml={2} align="right" color="secondary.dark">
            <b>{contests.submitted.length}</b> Contests Submissions <br />
            <b>0</b> Won <br />
            <b>{contests.submitted.length}</b> Ongoing <br />
          </Box>{' '}
        </Typography>
        <Typography variant="h6">
          <Box ml={2} align="right" color="secondary.dark">
            Total Prize Amount <br />
            <b>$365</b> Won <br />
            <b>${totalCreadted}</b> Paid <br />
          </Box>{' '}
        </Typography>
      </Grid>
    </Grid>
  );
}
