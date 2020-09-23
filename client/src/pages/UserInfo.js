import React, { useContext } from 'react';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import UserContext from '../context/UserContext';
import UserInfoStyles from './UserInfoStyles';

export default function UserInfo() {
  const classes = UserInfoStyles();
  const context = useContext(UserContext);
  const { user } = context.state;

  const profileImage = '7c0c914fd9b8665800d4f0e4cc8e01c7042aaea8.png';
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
        <Avatar
          alt="Remy Sharp"
          src={require(`../assets/${profileImage}`)}
          className={classes.avatar}
        />
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
