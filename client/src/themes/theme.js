import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Poppins', 'Poppins-Semibold', 'sans-serif'],
    fontSize: 12,
    h6: {
      fontSize: 16,
    },
    button: {
      fontSize: 9,
    },
  },
  palette: {
    primary: { main: '#1c1b1b', light: '#f4f4f4' },
    grey: { main: '#ddd', dark: '#888' },
    background: {
      paper: '#fff',
      default: '#fff',
    },
  },
});
