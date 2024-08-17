import { Box, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../style/constants";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        // backgroundColor: COLOR.pink,
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2">
        © 2024 Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
