import { makeStyles } from '@material-ui/core/styles';

const UserInfoStyles = makeStyles((theme) => ({
  avatar: {
    width: '10vw',
    height: '10vw',
    margin: '5% 5% 5% 0',
  },
  forms: {
    margin: '2% 0',
  },
  input: {
    display: 'none',
  },
  form: {
    marginRight: '5%',
  },
  upperBorder: {
    borderTop: `2px solid ${theme.palette.primary.light}`,
    width: '100%',
    textAlign: 'left',
    padding: '2% 0 5% 0',
  },
}));
export default UserInfoStyles;
