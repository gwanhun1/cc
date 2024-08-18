import { Box } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import love from "./love.json";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height={"100vh"}
    >
      <Lottie
        animationData={love}
        style={{ height: "220px", margin: "60px" }}
      />
    </Box>
  );
};

export default Loading;
