import React, { useContext } from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LandingStyles from './LandingStyles';
import UserContext from '../context/UserContext';

export default function Landing() {
  const classes = LandingStyles();
  const { state } = useContext(UserContext);
  const history = useHistory();
  const { allContests } = state;

  const handleCardClick = (id) => {
    history.push(`/contest/${id}`);
  };
  return (
    <Grid container className={classes.grid} spacing={4}>
      {allContests.map((contest, i) => {
        return (
          <Grid key={i} item xs={12} md={6} lg={3} className={classes.cardGrid}>
            <Paper>
              <CardActionArea
                onClick={() => {
                  handleCardClick(contest._id);
                }}
              >
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  image={
                    require(`../assets/${i}.jpg`) || require(`../assets/1.jpg`)
                  }
                  title="Contemplative Reptile"
                  className={classes.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h4" noWrap>
                    {contest.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    align="justify"
                  >
                    {contest.description.substr(0, 80)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box ml={1} color="secondary.dark" width="50%">
                  <Typography variant="subtitle2">
                    By {contest.user.name}
                  </Typography>
                </Box>
                <Box mr={1} align="right" width="50%">
                  <Typography variant="subtitle1">${contest.prize}</Typography>
                </Box>
              </CardActions>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
