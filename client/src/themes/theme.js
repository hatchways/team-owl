import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins , sans-serif',
    fontSize: 12,
    h6: {
      fontSize: 16,
    },
    button: {
      fontSize: 9,
    },
  },
  palette: {
    primary: { main: '#1c1b1b' },
    secondary: { main: '#f4f4f4' },
    grey: { main: '#ddd', dark: '#888' },
    background: {
      paper: '#fff',
      default: '#fff',
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          borderRadius: 0,
        },
        outlinedPrimary: {
          borderRadius: 0,
        },
      },
    },
  },
});
