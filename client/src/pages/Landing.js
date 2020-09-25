import React, { useContext } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import LandingStyles from './LandingStyles';
import UserContext from '../context/UserContext';

export default function Landing() {
  const classes = LandingStyles();
  const { state } = useContext(UserContext);
  const { allContests } = state;
  return (
    <Grid container className={classes.grid} spacing={4}>
      {allContests.map((contest, i) => {
        return (
          <Grid
            key={i}
            item
            xs={12}
            md={6}
            lg={3}
            className={classes.cardGrid}
            alignItems="stretch"
          >
            <Paper>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  image={require('../assets/jamesdiscombe.jpg')}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h5" noWrap>
                    {contest.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {contest.description.substr(0, 100)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
