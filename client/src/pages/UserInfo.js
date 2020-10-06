import React, { useContext } from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@material-ui/core';
import UserContext from '../context/UserContext';
import UserInfoStyles from './UserInfoStyles';

export default function UserInfo() {
  const classes = UserInfoStyles();
  const context = useContext(UserContext);
  const { changeAvatar } = context;
  const { user } = context.state;
  

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
          <Box mr={5} fontSize="2rem" align="right">
            {user.name} <br />
          </Box>
          <Box mr={5} fontSize="1rem" align="right" color="secondary.dark">
            {user.email}
          </Box>
        </Box>
        <Typography variant="h6">
          <Box ml={5} align="right" color="secondary.dark">
            <b>12</b> Contests Created <br />
            <b>8</b> Complete <br />
            <b>4</b> Ongoing
          </Box>{' '}
        </Typography>
        <Typography variant="h6">
          <Box ml={5} align="right" color="secondary.dark">
            <b>25</b> Contests Submissions <br />
            <b>11</b> Won <br />
            <b>14</b> Ongoing <br />
          </Box>{' '}
        </Typography>
        <Typography variant="h6">
          <Box ml={5} align="right" color="secondary.dark">
            Total Prize Amount <br />
            <b>$365</b> Won <br />
            <b>$200</b> Paid <br />
          </Box>{' '}
        </Typography>
      </Grid>
    </Grid>
  );
}
