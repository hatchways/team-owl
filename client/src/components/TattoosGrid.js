import React from 'react';
import { Typography, Box, GridList, GridListTile } from '@material-ui/core';

import imgData from '../imgData';
import useStyles from '../styles/styles';

const TattoosGrid = () => {
  const classes = useStyles();

  return (
    <Box className={classes.prizeTimeBox}>
      <Typography variant="h6" className={classes.prizeTimeSub}>
        Which designs do you like?
      </Typography>
      <Typography variant="body" className={classes.subtext}>
        Let's start by helping your designers understands which stype you
        prefer.
      </Typography>
      <div className={classes.grid}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {imgData.map((tile) => (
            <GridListTile key={tile.img} cols={tile.cols || 1}>
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </Box>
  );
};

export default TattoosGrid;
