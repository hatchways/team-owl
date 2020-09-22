import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },

  //app bar
  menuButton: {
    marginRight: theme.spacing(2),
  },

  appBar: {
    backgroundColor: theme.palette.primary.main,
  },

  toolBar: {
    maxWidth: 900,
    margin: 'auto',
  },

  navLinks: {
    color: theme.palette.grey.dark,
    marginRight: theme.spacing(3),
    cursor: 'pointer',
  },

  //input fields

  infoBox: {
    display: 'block',
    overflow: 'auto',
    margin: 'auto',
  },

  mainBox: {
    display: 'block',
    overflow: 'auto',
    margin: 'auto',
  },

  prizeTimeBox: {
    paddingTop: theme.spacing(6),
  },

  container: {
    width: '100%',
  },

  innerContainer: {
    maxWidth: '85%',
  },

  titleLogo: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign: 'left',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    fontFamily: theme.typography.fontFamily[1],
  },

  subtitle: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: theme.typography.fontFamily[1],
  },

  subtext: {
    color: theme.palette.grey.dark,
    paddingTop: theme.spacing(1),
    position: 'relative',
  },

  prizeTimeSub: {
    textAlign: 'left',
    fontFamily: theme.typography.fontFamily[1],
  },

  textFieldOne: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  //tattoo grid
  paper: {
    backgroundColor: 'white',
  },

  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: theme.spacing(1),
  },

  gridList: {
    width: '100%',
    height: 400,
  },

  gridListTile: {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.6,
    visibility: 'hidden',
  },

  overlayText: {
    textAlign: 'center',
    position: 'relative',
    top: '40%',
    color: '#fff',
  },

  overlayImg: {
    position: 'relative',
    top: '20%',
    left: '34%',
    width: 60,
    height: 90,
    color: '#fff',
  },

  //create contest button
  alignItemsAndJustifyContent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contestButton: {
    height: 60,
    width: 160,
    borderColor: theme.palette.primary.main,
    backgroundColor: '#fff',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light,
      borderColor: theme.palette.primary.light,
    },
  },

  buttonText: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-60%)',
  },

  //user name
  userName: {
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    fontFamily: theme.typography.fontFamily[1],
  },

  //tabs
  tabs: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    boxShadow: 'none',
  },

  tabLabels: {
    minWidth: '50%',
    width: '50%',
  },

  //prize in get contest
  prizeStandout: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
  },
}));

export default useStyles;
