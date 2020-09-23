import { makeStyles } from '@material-ui/core/styles';

const UserInfoStyles = makeStyles(() => ({
  grid: {
    height: '100%',
    textAlign: 'center',
    padding: '0 5%',
  },
  forms: {
    margin: '5% 0',
  },
  form: {
    margin: '3% 5%',
  },
  avatar: {
    width: '7vw',
    height: '7vw',
    margin: '0 5%',
  },
}));
export default UserInfoStyles;
