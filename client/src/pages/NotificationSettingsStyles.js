import { makeStyles } from '@material-ui/core/styles';

const NotificationSettingsStyles = makeStyles((theme) => ({
  upperBorder: {
    borderTop: `2px solid ${theme.palette.primary.light}`,
    width: '100%',
    textAlign: 'left',
    padding: '2% 0',
  },
}));

export default NotificationSettingsStyles;
