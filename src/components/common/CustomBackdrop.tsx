import React from "react";
import { Backdrop, BackdropProps } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

const backdropStyles: SxProps<Theme> = {
  backdropFilter: "blur(5px)",
  backgroundColor: "transparent",
};

const CustomBackdrop = (props: BackdropProps) => {
  return <Backdrop sx={backdropStyles} {...props} />;
};

export default CustomBackdrop;
