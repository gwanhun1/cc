import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { COLOR } from "../../style/constants";
import theme from "../../theme";

interface EventContentProps {
  title: string;
}

const TodoContent = ({ title }: EventContentProps) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          mx: "2px",
          fontWeight: 600,
          color: "#FFF",
          borderRadius: 2,
          fontSize: isSmDown ? 3 : 12,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          my: 1,
          p: 1,
          backgroundColor: "#FFAD19",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TodoContent;
