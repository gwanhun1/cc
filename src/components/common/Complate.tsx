import React from "react";
import Lottie from "lottie-react";
import { Box } from "@mui/material";
import complete from "./complete.json";

const Complete = () => {
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
        animationData={complete}
        style={{ width: "650px", height: "650px" }}
      />
    </Box>
  );
};

export default Complete;
