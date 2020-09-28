import React, { Fragment, useContext, useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  GridList,
  GridListTile,
  Button,
} from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import useStyles from './PickWinnerStyles';
import UserContext from '../../context/UserContext';
import { ContestContext } from '../../context/ContestContext';
import IsLoading from '../IsLoading';

const PickWinner = () => {
  const classes = useStyles();
  const params = useParams();
  const userContext = useContext(UserContext);
  const contestContext = useContext(ContestContext);

  useEffect(() => {
    contestContext.getContestById(params.id);
  }, [params.id]);

  const { user } = userContext.state;
  const { contest } = contestContext.state;

  return !contest.user ? (
    IsLoading()
  ) : user._id !== contest.user._id ? (
    <Redirect to="/" />
  ) : (
    <Fragment>
      <Container maxWidth="md">
        <Box boxShadow={3} className={classes.mainBox}>
          <Typography variant="h5" m={2} className={classes.title}>
            Pick your winner, {contest.user.name}!
          </Typography>
          <Container className={classes.innerContainer}>
            {contest.submissions.map((sub, i) => {
              return (
                <Box mb={5} key={i}>
                  <GridList className={classes.gridList} cols={2.5}>
                    {sub.submissionPic.url.map((tile, j) => (
                      <GridListTile key={j}>
                        <img src={tile} alt={tile} />
                      </GridListTile>
                    ))}
                  </GridList>
                  <Box mt={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => console.log(sub.name)}
                    >
                      Select {sub.name}
                    </Button>
                  </Box>
                </Box>
              );
            })}

            {/* <GridList className={classes.gridList} cols={2.5}>
              {contest.submissions.map((tile) => {
                return tile.submissionPic.url.map((tile, i) => (
                  <GridListTile key={i}>
                    <img src={tile} alt={tile} />
                  </GridListTile>
                ));
              })}
            </GridList>
            <Button variant="contained" color="primary">
              Select Winner
            </Button> */}
            {/* <GridList className={classes.gridList} cols={2.5}>
              {contest.submissions.map((tile) => {
                return tile.submissionPic.url.map((tile, i) => (
                  <GridListTile key={i}>
                    <img src={tile} alt={tile} />
                  </GridListTile>
                ));
              })}
            </GridList>
            <Button variant="contained" color="primary">
              Select Winner
            </Button> */}
          </Container>
        </Box>
      </Container>
    </Fragment>
  );
};

export default PickWinner;

{
  /* <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
              {contest.submissions.map((pic) => {
                return pic.submissionPic.map((pic, i) => (
                  <GridListTile key={i}>
                    <img src={pic.submissionPic} alt={pic} />
                    <GridListTileBar
                      title={pic}
                      classes={{
                        root: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton aria-label={`star ${pic}`}>
                          <StarBorderIcon className={classes.title} />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ));
              })}
            </GridList>
            ))
          </div> */
}
