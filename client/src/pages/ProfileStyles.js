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
    fontWeight: 600,
    borderColor: theme.palette.primary.light,
  },
  tab: {
    fontWeight: 700,
  },
}));

export default useProfileStyles;
