import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#7f408e' },
    secondary: { main: '#3e468a' },
    highlight: { main: '#ff7b47' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': { backgroundColor: '#ff7b47' },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        row: {
          '&.Mui-selected': { backgroundColor: '#ff7b4720' },
          '&:hover': { backgroundColor: '#ff7b4720' },
        },
      },
    },
  },
});

export default theme;
