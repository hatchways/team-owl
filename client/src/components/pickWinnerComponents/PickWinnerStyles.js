import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    maxWidth: '80%',
  },

  titleLogo: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontFamily: 'Poppins-Semibold',
  },

  subtitle: {
    textAlign: 'left',
    paddingTop: theme.spacing(6),
    fontFamily: 'Poppins-Semibold',
  },

  subtext: {
    color: theme.palette.grey.dark,
    paddingTop: theme.spacing(1),
    position: 'relative',
  },

  prizeTimeSub: {
    textAlign: 'left',
    fontFamily: 'Poppins-Semibold',
  },

  //tattoo grid
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
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
    color: theme.palette.secondary.main,
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
