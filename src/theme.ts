import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#cf364d",
    },
    secondary: {
      main: "#e4203d",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#cf364d",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#cf364d",
            },
            "&:hover fieldset": {
              borderColor: "#cf364d",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#cf364d",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#cf364d",
          color: "white",
          "&:hover": {
            backgroundColor: "#e4203d",
          },
        },
        outlined: {
          borderColor: "#cf364d",
          color: "#cf364d",
          "&:hover": {
            borderColor: "#e4203d",
          },
        },
      },
    },
  },
});

export default theme;
