import { makeStyles } from '@material-ui/core/styles';

const PaymentsStyles = makeStyles((theme) => ({
  upperBorder: {
    borderTop: `2px solid ${theme.palette.primary.light}`,
    width: '100%',
    height: '50vh',
    textAlign: 'left',
    padding: '2% 0',
  },

  stripeLogo: {
    width: 220,
    height: 100,
    cursor: 'pointer',
  },
}));

export default PaymentsStyles;
