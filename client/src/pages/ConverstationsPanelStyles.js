import { makeStyles } from '@material-ui/core/styles';

const UseConversationsPanelStyles = makeStyles((theme) => ({
  coversationGrid: {
    boxShadow: `0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)`,
    zIndex: 3,
    overflow: 'auto',
  },
  conversations: {
    height: '90%',
  },
  root: {
    width: '100%',
  },
  active: {
    backgroundColor: theme.palette.secondary.light,
    borderRight: `4px solid ${theme.palette.primary.main}`,
  },
  listHeader: {
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
  listText: {
    marginLeft: '5%',
    whiteSpace: 'nowrap',
  },
  avatar: {
    marginLeft: '10%',
  },
  wrapper: {
    flexDirection: 'row',
  },
  messageHeading: {
    height: '10%',
  },
}));

export default UseConversationsPanelStyles;
