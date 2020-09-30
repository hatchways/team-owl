import { makeStyles } from '@material-ui/core/styles';

const LandingStyles = makeStyles((theme) => ({
  grid: {
    padding: '2% 10%',
  },
  allContestGrid: {
    borderTop: `1px solid ${theme.palette.secondary.dark}`,
    margin: '5% 0',
  },
  featureGrid: {
    [theme.breakpoints.up('md')]: {
      paddingRight: '5%',
      borderRight: `1px solid ${theme.palette.secondary.dark}`,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '10%',
      height: '100vh',
      borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    },
  },
  featureTitle: {
    width: '100%',
  },
  cardGrid: {
    height: '75%',
  },
  cardAction: {
    height: '100%',
  },
  endingGrid: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '5%',
    },
  },

  media: {
    height: '100%',
    objectFit: 'contain',
    marginBottom: '5%',
  },
  img: {
    objectFit: 'cover',
    height: '25vh',
  },
}));

export default LandingStyles;
