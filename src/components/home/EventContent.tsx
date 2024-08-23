import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";

interface EventContentProps {
  imageUrl: string;
  title: string;
}

const EventContent: React.FC<EventContentProps> = ({ imageUrl, title }) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <img
      src={imageUrl}
      loading="lazy"
      style={{
        position: "absolute",
        width: "100%",
        height: isSmDown ? "49px" : "115px",
        objectFit: "cover",
      }}
      alt={title}
    />
  );
};

export default EventContent;
