import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3966BF',
      light: '#9986B9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F0801E',
      light: '#F8A629',
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
    },
    background: {
      default: '#263238',
      paper: '#263238',
    },
  },
  typography: {
    allVariants: {
      color: '#fff',
    },
  }
});
