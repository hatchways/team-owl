import { makeStyles } from '@material-ui/core/styles';

const LandingStyles = makeStyles((theme) => ({
  grid: {
    padding: '5% 10%',
    height: '200vh',
  },
  featureGrid: {
    height: '70vh',
    borderRight: `1px solid ${theme.palette.secondary.dark}`,
    padding: '0 5%',
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
  recommendedGrid: {
    padding: '0 5%',
  },
  media: {
    height: '100%',
    objectFit: 'contain',
    margin: '5% 0',
  },
}));

export default LandingStyles;
