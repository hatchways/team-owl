import { makeStyles } from '@material-ui/core/styles';

const EditProfileStyles = makeStyles((theme) => ({
  grid: {
    padding: '5% 5%',
    height: '100vh',
  },
  title: {
    height: '10vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary}`,
  },
  tab: {
    fontSize: '1rem',
    margin: '5% 0',
  },
}));

export default EditProfileStyles;
