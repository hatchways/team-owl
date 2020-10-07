import React from 'react';
import {
  Button,
  Typography,
  Grid,
  CardMedia,
  Card,
  CircularProgress,
  Box,
} from '@material-ui/core';
import ContestCardPanelStyles from './ContestCardPanelStyles';

export default function ContestCardPanel(props) {
  const { contest, submitted } = props;
  const classes = ContestCardPanelStyles();
  let thumbnail;
  if (submitted) {
    thumbnail = contest.submissionPic ? contest.submissionPic[0] : ' ';
  } else {
    thumbnail = contest.contestPics[0];
  }
  return (
    <Grid
      container
      justify="center"
      className={classes.cardGrid}
      onClick={() => {
        console.log('clicked');
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
