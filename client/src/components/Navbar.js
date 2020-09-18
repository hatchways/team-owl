import React, { Fragment } from 'react';
import {
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Link,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from '../styles/styles';

const Navbar = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Container className={classes.container}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.titleLogo}>
              <Box letterSpacing={8} m={1}>
                TATTOO ART
              </Box>
            </Typography>
            <Link
              href="#"
              variant="button"
              onClick={preventDefault}
              className={classes.navLinks}
            >
              Discover
            </Link>
            <Link
              href="#"
              variant="button"
              onClick={preventDefault}
              className={classes.navLinks}
            >
              Messages
            </Link>
            <Link
              href="#"
              variant="button"
              onClick={preventDefault}
              className={classes.navLinks}
            >
              Notifications
            </Link>
            <Button variant="outlined" className={classes.navLinks}>
              Create Contest
            </Button>
            <Avatar
              alt="Remy Sharp"
              className={classes.navLinks}
              src="/images/avatar1.png"
            />
            <Link
              href="#"
              variant="button"
              onClick={preventDefault}
              className={classes.navLinks}
            >
              Account
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
