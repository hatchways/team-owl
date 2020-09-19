import { makeStyles } from '@material-ui/core/styles';

const useNavStyles = makeStyles(() => ({
  appBar: {
    padding: '0 5%',
  },
  logo: {
    letterSpacing: '0.75rem',
    fontWeight: '300',
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    // borderRadius: 0,
    borderColor: 'white',
    marginLeft: '10%',
    color: '#f4f4f4',
  },
}));

export default useNavStyles;
