import { makeStyles } from '@material-ui/core/styles';

const useProfileStyles = makeStyles((theme) => ({
  grid: {
    minHeight: '50vh',
    padding: '2% 10%',
  },
  avatar: {
    width: '10vw',
    height: '10vw',
  },
  name: {
    fontWeight: 600,
  },
  button: {
    fontWeight: 800,
    borderColor: theme.palette.primary.light,
  },
}));

export default useProfileStyles;
