import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, styled } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "absolute",
  bottom: 24,
  right: 24,
  backgroundColor: "#cf364d",
  "&:hover": {
    backgroundColor: "#e4203d",
  },
});

type AddButtonProps = { setEdit: any };

export const AddButton = ({ setEdit }: AddButtonProps) => (
  <StyledFab color="primary" aria-label="add" onClick={() => setEdit(true)}>
    <AddIcon />
  </StyledFab>
);
