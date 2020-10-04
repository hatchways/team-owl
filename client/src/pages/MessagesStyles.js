import { makeStyles } from '@material-ui/core/styles';

const UseMessagesStyles = makeStyles((theme) => ({
  messageGrid: {
    height: `Calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
    overflow: 'hidden',
    flexGrow: 1,
  },
  coversationGrid: {
    boxShadow: `0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)`,
    zIndex: 3,
  },
  conversattions: {
    height: '100%',
    width: '100%',
  },
  messeges: {
    minWidth: '100%',
  },
  messageHeading: {
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    minWidth: '100%',
  },
  recepientName: {
    backgroundColor: theme.palette.secondary.light,
  },
  sendMessages: {
    minHeight: '30%',
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

export default UseMessagesStyles;
