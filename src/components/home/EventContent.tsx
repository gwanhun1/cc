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
    <>
      <div>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: isSmDown ? "59px" : "135px",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
          }}
          aria-label={title} // Accessibility improvement
        ></div>
      </div>
    </>
  );
};

export default EventContent;
