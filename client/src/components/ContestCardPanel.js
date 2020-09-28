import React from 'react';
import {
  Button,
  Typography,
  Grid,
  CardMedia,
  Card,
  CircularProgress,
} from '@material-ui/core';
import ContestCardPanelStyles from './ContestCardPanelStyles';

export default function ContestCardPanel(props) {
  const { contest } = props;
  const classes = ContestCardPanelStyles();
  return (
    <Grid container justify="center" className={classes.cardGrid}>
      <Grid container item xs={3}>
        <Card className={classes.card}>
          {contest.contestPics ? (
            <CardMedia
              className={classes.media}
              //image={require(`../assets/${contest.thumbnail}`)}
              image={
                contest.contestPics[0] ||
                'https://team-owl-tattoo.s3.ca-central-1.amazonaws.com/tattoos/tattoo1.png'
              } //using Brief pic instead
              title="hi"
              height="140"
            />
          ) : (
            <CircularProgress />
          )}

          {contest.submissions && (
            <Typography
              className={classes.cardText}
              variant="subtitle1"
              align="center"
              color="secondary"
            >
              {contest.submissions.length} SUBMISSIONS
            </Typography>
          )}
        </Card>
      </Grid>
      <Grid container item xs={9} className={classes.textGrid}>
        <Grid container xs={12} item>
          <Typography variant="h5" className={classes.contestTitle}>
            {contest.title}
          </Typography>
          <Typography variant="body2" className={classes.contestSubTitle}>
            {contest.subtitle}
          </Typography>
        </Grid>
        <Grid container item xs={12} alignContent="center">
          <Button variant="contained" color="primary">
            ${contest.prize}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
