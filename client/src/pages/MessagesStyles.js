import { makeStyles } from '@material-ui/core/styles';

const UseMessagesStyles = makeStyles((theme) => ({
  messageGrid: {
    height: `Calc(100vh - ${theme.mixins.toolbar.minHeight}px - 8px)`,
    overflow: 'hidden',
  },
}));

export default UseMessagesStyles;
