import { makeStyles } from '@material-ui/core/styles';

const LoginSignupStyles = makeStyles(() => ({
  button: {
    padding: '1rem 2rem',
    width: '50%',
    marginTop: '2rem',
  },
  loginTitle: {
    fontWeight: 600,
  },
  loginPaper: {
    padding: '3rem',
    width: '30vw',
    margin: '5%',
    textAlign: 'center',
  },
  link: {
    marginTop: '5%',
    textAlign: 'center',
  },
}));

export default LoginSignupStyles;
