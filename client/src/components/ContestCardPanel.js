import React from 'react';
import {
  Button,
  Typography,
  Grid,
  CardMedia,
  Card,
  Box,
} from '@material-ui/core';
import ContestCardPanelStyles from './ContestCardPanelStyles';
import { useHistory } from 'react-router-dom';

export default function ContestCardPanel(props) {
  const { contest, submitted } = props;
  const classes = ContestCardPanelStyles();
  const history = useHistory();

  let thumbnail;
  if (submitted) {
    thumbnail = contest.submissions
      ? contest.submissions[0].submissionPic.url[0]
      : ' ';
  } else {
    thumbnail = contest.contestPics[0];
  }
  const handleCardClick = (id) => {
    history.push(`/contest/${id}`);
  };
  return (
    <Grid
      container
      justify="center"
      className={classes.cardGrid}
      onClick={() => {
        handleCardClick(contest._id);
      }}
    >
      <Grid container item xs={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={thumbnail}
            title="image"
            height="140"
          />
          <Typography
            className={classes.cardText}
            variant="subtitle1"
            align="center"
            color="secondary"
          >
            {!submitted ? `${contest.submissions.length} "SKETCHES` : ''}
          </Typography>
        </Card>
      </Grid>
      <Grid container item xs={9} className={classes.textGrid}>
        <Grid container xs={12} item>
          <Typography variant="h5" className={classes.contestTitle}>
            {contest.title}
          </Typography>
          <Typography variant="body2" className={classes.contestSubTitle}>
            {contest.description.substr(0, 80)}
          </Typography>
        </Grid>
        <Box mt={2}>
          <Grid container item xs={12} alignContent="center">
            <Button variant="contained" color="primary">
              ${contest.prize}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
