import React, { useContext } from 'react';
import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Typography,
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
    <Grid container className={classes.grid} spacing={5}>
      {allContests[0] && (
        <>
          <Grid container item sm={12} className={classes.highlightGrid}>
            <Grid
              container
              item
              xs={12}
              md={6}
              lg={6}
              justify="center"
              alignContent="flex-start"
              className={classes.featureGrid}
            >
              <Grid className={classes.featureTitle}>
                <Box
                  width="100%"
                  height="100%"
                  align="left"
                  color="secondary.dark"
                  mb={2}
                >
                  <Typography variant="h5">Featured</Typography>
                </Box>
              </Grid>
              <Grid container className={classes.cardGrid}>
                <CardActionArea
                  className={classes.cardAction}
                  onClick={() => {
                    handleCardClick(allContests[0]._id);
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image={allContests[0].contestPics[0]}
                  />
                  <Box p={(2, 0)}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <b>{allContests[0] ? allContests[0].title : 'Roses'}</b>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="justify"
                    >
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
              sm={12}
              md={6}
              alignContent="flex-start"
              justify="center"
              className={classes.endingGrid}
            >
              <Grid item xs={12}>
                <Box
                  width="100%"
                  height="100%"
                  align="left"
                  color="secondary.dark"
                  mb={2}
                >
                  <Typography variant="h6">Ending Soon</Typography>
                </Box>
              </Grid>
              <Grid
                container
                item
                xs={12}
                justify="space-between"
                alignContent="space-between"
              >
                {allContests.map((contest, i) => {
                  if (i < 4) {
                    return (
                      <Grid item xs={12} sm={5} md={5} lg={5} key={i}>
                        <CardActionArea
                          onClick={() => {
                            handleCardClick(contest._id);
                          }}
                        >
                          <CardMedia
                            component="img"
                            alt="Contest Image"
                            image={contest.contestPics[0]}
                            title={contest.title}
                            className={classes.img}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="subtitle1"
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
                  return '';
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            className={classes.allContestGrid}
            spacing={5}
          >
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
                  <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                    <CardActionArea
                      onClick={() => {
                        handleCardClick(contest._id);
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="Contest Image"
                        image={contest.contestPics[0]}
                        title={contest.title}
                        className={classes.img}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          noWrap
                        >
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
              return '';
            })}
          </Grid>
        </>
      )}
    </Grid>
  );
}
