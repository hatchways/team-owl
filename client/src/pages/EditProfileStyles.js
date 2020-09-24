import { makeStyles } from '@material-ui/core/styles';

const EditProfileStyles = makeStyles((theme) => ({
  grid: {
    padding: '5% 10%',
  },
  title: {
    height: '10vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.light}`,
  },
  tab: {
    fontSize: '1rem',
    margin: '5% 0',
  },
}));

export default EditProfileStyles;
