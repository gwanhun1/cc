import { createTheme } from "@mui/material/styles";

// 기본 테마 설정
const theme = createTheme({
  palette: {
    primary: {
      main: "#cf364d", // 기본 색상
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
            color: "#cf364d", // 기본 색상
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#cf364d", // 기본 색상
            },
            "&:hover fieldset": {
              borderColor: "#cf364d", // 기본 색상
            },
            "&.Mui-focused fieldset": {
              borderColor: "#cf364d", // 기본 색상
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

// 동적 테마 생성 함수
export const getDynamicTheme = (primaryColor: string) => {
  return createTheme({
    ...theme, // 기본 테마 복사
    palette: {
      ...theme.palette,
      primary: {
        main: primaryColor, // 동적으로 전달받은 색상 사용
      },
    },
    components: {
      ...theme.components,
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: primaryColor, // 동적 색상
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: primaryColor, // 동적 색상
              },
              "&:hover fieldset": {
                borderColor: primaryColor, // 동적 색상
              },
              "&.Mui-focused fieldset": {
                borderColor: primaryColor, // 동적 색상
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: primaryColor, // 동적 색상
            color: "white",
            "&:hover": {
              backgroundColor: primaryColor, // 동적 색상
            },
          },
          outlined: {
            borderColor: primaryColor, // 동적 색상
            color: primaryColor, // 동적 색상
            "&:hover": {
              borderColor: primaryColor, // 동적 색상
            },
          },
        },
      },
    },
  });
};

export default theme;
