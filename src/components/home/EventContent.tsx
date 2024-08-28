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
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: isSmDown ? "59px" : "139px",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label={title} // Accessibility improvement
    ></div>
  );
};

export default EventContent;
