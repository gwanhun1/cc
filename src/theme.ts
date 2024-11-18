import { createTheme } from "@mui/material/styles";

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

// 동적 테마 생성
export const getDynamicTheme = (primaryColor: string) => {
  return createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      primary: {
        main: primaryColor,
      },
    },
    components: {
      ...theme.components,
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: primaryColor,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: primaryColor,
              },
              "&:hover fieldset": {
                borderColor: primaryColor,
              },
              "&.Mui-focused fieldset": {
                borderColor: primaryColor,
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: primaryColor,
            color: "white",
            "&:hover": {
              backgroundColor: primaryColor,
            },
          },
          outlined: {
            borderColor: primaryColor,
            color: primaryColor,
            "&:hover": {
              borderColor: primaryColor,
            },
          },
        },
      },
    },
  });
};

export default theme;
