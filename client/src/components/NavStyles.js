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
  avatar: {
    marginLeft: '5%',
  },
  button: {
    borderColor: 'white',
    marginLeft: '5%',
    color: '#f4f4f4',
  },
  buttonText: {
    textTransform: 'none',
  },
}));

export default useNavStyles;
