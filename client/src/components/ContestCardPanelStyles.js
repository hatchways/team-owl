import { makeStyles } from '@material-ui/core/styles';

const ContestCardPanelStyles = makeStyles(() => ({
  cardGrid: {
    marginBottom: '5%',
  },
  card: {
    position: 'relative',
    borderRadius: 0,
  },
  cardText: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
    paddingTop: '15%',
    fontWeight: 500,
  },
  media: {
    height: '15vw',
    width: '15vw',
  },
  textGrid: {
    padding: '2.5% 0 5% 0',
  },
  contestTitle: {
    width: '100%',
    fontWeight: 600,
  },
  contestSubTitle: {
    fontWeight: 400,
    color: '#a09d9dbf',
  },
}));

export default ContestCardPanelStyles;
