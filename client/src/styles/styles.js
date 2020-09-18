import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  navLinks: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(3),
    borderColor: '#ffffff',
  },

  mainBox: {
    height: '90rem',
    margin: 'auto',
  },

  textInputBox: {
    height: '24rem',
    width: '100%',
    margin: 'auto',
  },

  prizeTimeBox: {
    paddingTop: theme.spacing(6),
  },

  innerContainer: {
    maxWidth: '75%',
    height: '80rem',
  },

  title: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    fontFamily: theme.typography.fontFamily[1],
  },
  subtitle: {
    textAlign: 'left',
    paddingTop: theme.spacing(6),
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
  paper: {
    backgroundColor: 'white',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: theme.spacing(2),
  },
  gridList: {
    width: '100%',
    height: 400,
  },
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
    color: theme.palette.primary.light,
  },
  buttonText: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-60%)',
  },
}));

export default useStyles;
