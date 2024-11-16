import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import { COLOR } from "../../style/constants";
import theme from "../../theme";

interface EventContentProps {
  imageUrl: string;
  title: string;
}

const EventContent = ({ imageUrl, title }: EventContentProps) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { color } = useUserThemeFetch();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          color === "default"
            ? "#d0354e1a"
            : color === "#28a745"
              ? "#28a74533"
              : color === "#007bff"
                ? "#007bff33"
                : color === "#000000"
                  ? "#00000033"
                  : "#6c757d33",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          ml: "3px",
          fontWeight: 600,
          color: color,
          mb: "2px",
          borderRadius: "0px",
          fontSize: isSmDown ? 6 : 14,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          minHeight: isSmDown ? "50px" : "133px",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "4px",
          width: "100%",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          position: "relative",
          zIndex: 1,
          "@keyframes shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "25%": { transform: "translateX(-5px)" },
            "75%": { transform: "translateX(5px)" },
          },
          "&:hover": {
            animation: "shake 0.5s ease-in-out infinite",
            zIndex: 100,
          },
        }}
        aria-label={title}
      />
    </Box>
  );
};

export default EventContent;
