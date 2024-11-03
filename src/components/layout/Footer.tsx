import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2">© 2024 made in junggwanhun.</Typography>
    </Box>
  );
};

export default Footer;
