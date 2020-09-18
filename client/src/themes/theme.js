import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ddd',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
    },
    '& .MuiOutlinedInput-input': {
      color: '#ddd',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiInputLabel-outlined': {
      color: '#ddd',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'black',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'black',
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
    grey: { main: '#dddddd', dark: '#888888' },
    secondary: { main: '#000000', light: '#ffffff' },
  },
});
