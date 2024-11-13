import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3966BF',
      light: '#3966BF',
      contrastText: '#fff',
    },
    secondary: {
      //main: '#BDCFF2',
      main: '#545455',
      light: '#F8A629',
      contrastText: '#fff',
    },
    text: {
      primary: '#333',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: {
    allVariants: {
      color: '#333',
    },
    fontWeightRegular: 500
  }
});
