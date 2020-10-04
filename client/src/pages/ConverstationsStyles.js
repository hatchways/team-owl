import { makeStyles } from '@material-ui/core/styles';

const UseConversationsStyles = makeStyles((theme) => ({
  coversationGrid: {
    boxShadow: `0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)`,
    zIndex: 3,
    width: '100%',
  },
  conversations: {
    height: '90%',
  },
  list: {
    width: '100%',
  },
  listHeader: {
    height: '10%',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
  listText: {
    marginLeft: '5%',
  },
  wrapper: {
    flexDirection: 'row',
  },
  messageHeading: {
    height: '10%',
  },
}));

export default UseConversationsStyles;
