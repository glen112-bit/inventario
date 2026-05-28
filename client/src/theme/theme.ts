import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    mode: 'dark',

    primary: {
      main: '#00d4ff',
    },

    secondary: {
      main: '#7c4dff',
    },

    background: {
      default: '#0b1020',
      paper: '#121826',
    },

  },

  typography: {

    fontFamily: 'Inter, sans-serif',

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 700,
    },

  },

  shape: {
    borderRadius: 18,
  },

})

export default theme
