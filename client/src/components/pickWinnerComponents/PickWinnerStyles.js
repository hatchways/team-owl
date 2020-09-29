import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  //input fields
  mainBox: {
    display: 'block',
    overflow: 'auto',
    margin: 'auto',
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
}));

export default useStyles;
