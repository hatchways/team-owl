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
    <Grid className={classes.grid}>
      <Grid container item sm={12} className={classes.highlightGrid}>
        <Grid
          container
          item
          xs={12}
          lg={6}
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
                image={require('../assets/5.jpg')}
                title="Contemplative Reptile"
              />
              <Box p={(2, 0)}>
                <Typography gutterBottom variant="h5" component="h2">
                  <b>{allContests[0] ? allContests[0].title : 'Roses'}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {allContests[0]
                    ? allContests[0].description.substr(0, 200)
                    : ' '}
                </Typography>
              </Box>
            </CardActionArea>
          </Grid>
        </Grid>
        <Grid
          container
          item
          s={12}
          lg={6}
          alignContent="space-between"
          className={classes.endingGrid}
        >
          <Grid item sm={12}>
            <Box align="left" color="secondary.dark" marginBottom="10%">
              <Typography variant="h6">Ending Soon</Typography>
            </Box>
          </Grid>
          <Grid
            container
            item
            sm={12}
            justify="space-between"
            alignContent="space-between"
            className={classes.endingCards}
          >
            {allContests.map((contest, i) => {
              if (i < 4) {
                return (
                  <Grid item md={12} lg={5}>
                    <CardActionArea
                      onClick={() => {
                        handleCardClick(contest._id);
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={
                          require(`../assets/${i}.jpg`) ||
                          require(`../assets/1.jpg`)
                        }
                        title="Contemplative Reptile"
                        className={classes.img}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="h4"
                          align="center"
                          noWrap
                        >
                          {contest.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.allContestGrid} spacing={6}>
        <Grid item sm={12}>
          <Box my={3}>
            <Typography variant="h5" align="center">
              All Contest
            </Typography>
          </Box>
        </Grid>
        {allContests.map((contest, i) => {
          if (i > 3) {
            return (
              <Grid
                key={i}
                item
                sm={12}
                md={6}
                lg={3}
                className={classes.cardGrid}
              >
                <CardActionArea
                  onClick={() => {
                    handleCardClick(contest._id);
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={
                      require(`../assets/${i}.jpg`) ||
                      require(`../assets/1.jpg`)
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
                  <CardActions>
                    <Box ml={1} color="secondary.dark" width="50%">
                      <Typography variant="subtitle2">
                        By {contest.user.name}
                      </Typography>
                    </Box>
                    <Box mr={1} align="right" width="50%">
                      <Typography variant="subtitle1">
                        ${contest.prize}
                      </Typography>
                    </Box>
                  </CardActions>
                </CardActionArea>
              </Grid>
            );
          }
        })}
      </Grid>
    </Grid>
  );
}
