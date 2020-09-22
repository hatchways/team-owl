import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.primary.light,
    marginRight: theme.spacing(3),
    borderColor: '#ffffff',
  },

  //input fields
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
    maxWidth: '75%',
  },

  titleLogo: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    fontFamily: 'Poppins-Semibold',
    //fontFamily: theme.typography.fontFamily[1],
  },

  subtitle: {
    textAlign: 'left',
    paddingTop: theme.spacing(6),
    fontFamily: 'Poppins-Semibold',
    //fontFamily: theme.typography.fontFamily[1],
  },

  subtext: {
    color: theme.palette.grey.dark,
    paddingTop: theme.spacing(1),
    position: 'relative',
  },

  prizeTimeSub: {
    textAlign: 'left',
    fontFamily: 'Poppins-Semibold',
    //fontFamily: theme.typography.fontFamily[1],
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
    height: 80,
    width: 240,
    backgroundColor: 'black',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(10),
    color: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: '#f4f4f4',
      color: '#1c1b1b',
    },
  },

  buttonText: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-60%)',
  },

  //date / timezone form
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
