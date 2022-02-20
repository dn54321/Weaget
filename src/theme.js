import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: "#46B4AF"
          }
        }
      }
  },
  palette: {
    primary: {
      main: '#4682B4',
      light: '#46B4AF',
      dark: '#005684',
      contrastText: '#fff'
    },
    secondary: {
      main: '#46b478',
      light: ' #7be7a7',
      dark: '#00834c',
      contrastText: '#fff'
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#fff',
      contrastText: '#000'
    },        
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

export default theme;