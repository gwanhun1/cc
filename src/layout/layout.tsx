import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import theme from "../theme";

interface LayoutProps {
  children: React.ReactNode;
}

const boxStyle = {
  flex: 1,
  marginTop: 6,
};

const Layout = ({ children }: LayoutProps) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const navHeight = isSmDown ? "56px" : "66px";

  return (
    <Box
      sx={{
        ...boxStyle,
        padding: isSmDown ? 0.5 : 0,
        marginTop: isSmDown ? 2.5 : 14,
        justifyContent: "center",
        maxWidth: "1200px",
        width: "100%",
        mx: "auto",
        minHeight: `calc(100vh - ${navHeight})`,
      }}
    >
      <Box
        sx={{
          ...boxStyle,
          marginBottom: isSmDown ? 2 : 3,
          justifyContent: "center",
          maxWidth: "1280px",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
