import { makeStyles } from '@material-ui/core/styles';

const LandingStyles = makeStyles((theme) => ({
  grid: {
    padding: '2% 10%',
  },
  highlightGrid: {
    marginBottom: '10%',
  },
  allContestGrid: {
    borderTop: `1px solid ${theme.palette.secondary.dark}`,
    marginBottom: '10%',
  },
  featureGrid: {
    height: '80vh',
    [theme.breakpoints.up('lg')]: {
      paddingRight: '5%',
      borderRight: `1px solid ${theme.palette.secondary.dark}`,
    },
    [theme.breakpoints.down('md')]: {
      height: '100vh',
      borderBottom: `1px solid ${theme.palette.secondary.dark}`,
    },
  },
  featureTitle: {
    width: '100%',
  },
  cardGrid: {
    height: '70%',
    paddingBottom: '5%',
  },
  cardAction: {
    height: '100%',
  },
  endingGrid: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '5%',
    },
  },
  endingCards: {
    height: '90%',
  },
  media: {
    height: '100%',
    objectFit: 'contain',
    margin: '5% 0',
  },
  img: {
    objectFit: 'cover',
    height: '25vh',
  },
}));

export default LandingStyles;
