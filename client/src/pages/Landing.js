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
    <Grid container className={classes.grid}>
      <Grid container>
        <Grid
          container
          item
          xs={7}
          alignItems="center"
          direction="column"
          className={classes.featureGrid}
        >
          <Grid className={classes.featureTitle}>
            <Box width="100%" height="100%" align="left" color="secondary.dark">
              <Typography variant="h5" align="left">
                Featured
              </Typography>
            </Box>
          </Grid>
          <Grid container className={classes.cardGrid}>
            <CardActionArea className={classes.cardAction}>
              <CardMedia
                className={classes.media}
                image={require('../assets/jamesdiscombe.jpg')}
                // image={image1}
                title="Contemplative Reptile"
              />
              <Box p={(2, 0)}>
                <Typography gutterBottom variant="h5" component="h2">
                  <b>Roses</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  The rose is recognized everywhere as an important, ubiquitous
                  flower that holds deep meaning and respect.
                </Typography>
              </Box>
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
          <Box width="100%" height="100%" align="left" color="secondary.dark">
            <Typography variant="h6">Recomended for you</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container justify="center"></Grid>
    </Grid>
  );
}
