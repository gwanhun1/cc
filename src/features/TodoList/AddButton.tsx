import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, styled } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "absolute",
  bottom: 24,
  right: 24,
  backgroundColor: "#E17055",
  "&:hover": {
    backgroundColor: "#D15045",
  },
});

export const AddButton = () => (
  <StyledFab color="primary" aria-label="add">
    <AddIcon />
  </StyledFab>
);
