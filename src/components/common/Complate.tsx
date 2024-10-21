import React from "react";
import Lottie from "lottie-react";
import { Box } from "@mui/material";
import complate from "./complate.json";

const Complate = () => {
  return (
    <Box
      position="absolute"
      sx={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
      }}
    >
      <Lottie
        animationData={complate}
        style={{ width: "650px", height: "650px" }}
      />
    </Box>
  );
};

export default Complate;
