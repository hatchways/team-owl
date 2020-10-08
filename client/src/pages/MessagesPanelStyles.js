import { makeStyles } from '@material-ui/core/styles';

const UseMessagesPanelStyles = makeStyles((theme) => ({
  messages: {
    maxHeight: '100%',
  },
  recepientName: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.secondary.light,
    height: '10%',
    width: '100%',
    padding: '0 2%',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  allMessagesGrid: {
    padding: '2% 4%',
    height: '78%',
    overflow: 'auto',
  },
  allMessages: {
    width: '100%',
  },
  sendMessages: {
    height: '10%',
    borderTop: `2px solid ${theme.palette.secondary.main}`,
  },
  messageTextfield: {
    height: '100%',
    padding: '0 3%',
  },
  buttonText: {
    textTransform: 'none',
  },
}));

export default UseMessagesPanelStyles;
