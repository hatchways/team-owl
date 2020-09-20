import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ddd',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000',
    },
    '& .MuiOutlinedInput-input': {
      color: '#ddd',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: '#000',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: '#000',
    },
    '& .MuiInputLabel-outlined': {
      color: '#ddd',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: '#000',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#000',
    },
    '&:hover .MuiButton-contained': {
      color: '#ddd',
    },
  },

  typography: {
    fontFamily: ['Poppins', 'Poppins-Semibold'],
    fontSize: 12,
    h6: {
      fontSize: 16,
    },
    button: {
      fontSize: 9,
    },
  },
  palette: {
    primary: { main: '#000', light: '#fff' },
    grey: { main: '#ddd', dark: '#888' },
    background: {
      paper: '#fff',
      default: '#fff',
    },
  },
});
