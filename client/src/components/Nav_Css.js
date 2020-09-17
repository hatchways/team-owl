import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../themes/theme';

const useNavStyles = makeStyles((theme) => ({
  appBar: {
    padding: '0 5%',
  },
  logo: {
    letterSpacing: '0.75rem',
    fontWeight: '300',
  },
  button: {
    borderRadius: 0,
    borderColor: 'white',
    marginLeft: '10%',
  },
}));

export default useNavStyles;
