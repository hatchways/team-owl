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
    maxWidth: '75%',
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    fontFamily: 'Poppins-Semibold',
  },

  subtitle: {
    textAlign: 'left',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(1),
    fontFamily: 'Poppins-Semibold',
  },

  //create contest button
  boxAroundButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contestButton: {
    height: 80,
    width: 240,
    margin: 'auto',
    backgroundColor: 'black',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
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
