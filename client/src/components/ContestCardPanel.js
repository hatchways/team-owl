import React from 'react';
import { Button, Typography, Grid, CardMedia, Card } from '@material-ui/core';
import ContestCardPanelStyles from './ContestCardPanelStyles';

export default function ContestCardPanel(props) {
  const { contest } = props;
  const classes = ContestCardPanelStyles();
  return (
    <Grid container justify="center" className={classes.cardGrid}>
      <Grid container item xs={3}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={require(`../assets/${contest.thumbnail}`)}
            title="hi"
            height="140"
          />
          {contest.submissions && (
            <Typography
              className={classes.cardText}
              variant="subtitle1"
              align="center"
              color="secondary"
            >
              {contest.submissions.length} SKETCHES
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