import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import LandingStyles from './LandingStyles';
import image1 from '../assets/jamesdiscombe.jpg';

export default function Landing() {
  const classes = LandingStyles();

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.grid}
    >
      <Grid container>
        <Grid
          container
          item
          xs={7}
          justify="center"
          className={classes.featureGrid}
        >
          <Grid>
            <Box width="100%">
              <Typography variant="h5" align="left">
                Featured
              </Typography>
            </Box>
          </Grid>
          <Grid container className={classes.cardGrid}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={require('../assets/jamesdiscombe.jpg')}
                // image={image1}
                title="Contemplative Reptile"
              />
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardActionArea>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={5}
          justify="center"
          className={classes.recommendedGrid}
        >
          {' '}
          <Typography variant="h6">Recomended for you</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center"></Grid>
    </Grid>
  );
}
