import { makeStyles } from '@material-ui/core/styles';

const LandingStyles = makeStyles((theme) => ({
  grid: {
    padding: '5% 10%',
  },
  featureGrid: {
    height: '60vh',
    borderRight: `1px solid ${theme.palette.secondary.dark}`,
    padding: '0 5%',
  },
  cardGrid: {
    height: '100%',
    width: '100%',
  },
  recommendedGrid: {
    padding: '0 5%',
  },
  media: {
    width: 'auto',
    objectFit: 'cover',
  },
}));

export default LandingStyles;
