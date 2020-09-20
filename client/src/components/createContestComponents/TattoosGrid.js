import React, { useContext } from 'react';
import { Typography, Box, GridList, GridListTile } from '@material-ui/core';
import { ContestContext } from './ContestContext';
import imgData from '../../imgDataS3';
import useStyles from './CreateContestStyles';

const TattoosGrid = () => {
  const classes = useStyles();
  const contest = useContext(ContestContext);

  const addToPicsArray = (e) => {
    e.preventDefault();
    contest.setPics([...contest.pics, e.target.src]);
    e.target.parentNode.children[1].style.visibility = 'visible';
  };

  const removeFromPicsArray = (e) => {
    e.preventDefault();
    const clickTarget = e.target;
    if (clickTarget.nodeName === 'DIV') {
      const overlay = clickTarget.parentNode.children[0].src;
      const subtractedPics = contest.pics.filter((pic) => pic !== overlay);
      contest.setPics(subtractedPics);
      clickTarget.style.visibility = 'hidden';
      return;
    }
    //if the user clicks on the checkmark instead of elsewhere on the overlay box
    const overlay = clickTarget.parentNode.parentNode.children[0].src;
    const subtractedPics = contest.pics.filter((pic) => pic !== overlay);
    contest.setPics(subtractedPics);
    clickTarget.parentNode.style.visibility = 'hidden';
  };

  return (
    <Box className={classes.prizeTimeBox}>
      <Typography variant="h6" className={classes.prizeTimeSub}>
        Which designs do you like?
      </Typography>
      <Typography className={classes.subtext}>
        Let's start by helping your designers understands which type you prefer.
      </Typography>
      <div className={classes.grid}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {imgData.map((tile) => (
            <GridListTile
              key={tile.img}
              cols={tile.cols || 1}
              className={classes.gridListTile}
            >
              <img
                src={tile.img}
                alt={tile.title}
                onClick={(e) => addToPicsArray(e)}
              />
              <Box
                id="overlay"
                className={classes.overlay}
                onClick={(e) => removeFromPicsArray(e)}
              >
                <img
                  src="/images/checkmark.png"
                  alt="checkmark"
                  className={classes.overlayImg}
                  onClick={(e) => removeFromPicsArray(e)}
                ></img>
              </Box>
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Box>
  );
};

export default TattoosGrid;
