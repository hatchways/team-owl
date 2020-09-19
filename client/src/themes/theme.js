import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins , sans-serif',
    fontSize: 12,
  },
  palette: {
    primary: { main: '#1c1b1b', light: '#d0d0d0' },
    secondary: { main: '#f4f4f4' },
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
});
