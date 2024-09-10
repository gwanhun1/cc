import { Box } from "@mui/material";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import love from "./love.json";

const Loading = () => {
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height={viewportHeight}
      boxSizing="border-box"
      overflow="hidden"
    >
      <Lottie
        animationData={love}
        style={{ height: "220px", margin: "60px" }}
      />
    </Box>
  );
};

export default Loading;
