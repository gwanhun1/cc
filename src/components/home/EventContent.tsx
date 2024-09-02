import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";

interface EventContentProps {
  imageUrl: string;
  title: string;
}

const EventContent: React.FC<EventContentProps> = ({ imageUrl, title }) => {
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  console.log(isSmDown);

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: isSmDown ? "108%" : "104%",
            height: isSmDown ? "50px" : "138px",
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
