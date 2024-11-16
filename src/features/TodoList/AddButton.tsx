import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, styled } from "@mui/material";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";

const StyledFab = styled(Fab)<{ color: string }>(({ theme, color }) => ({
  position: "absolute",
  bottom: 24,
  right: 24,
  backgroundColor: color,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

type AddButtonProps = { setEdit: any };

export const AddButton = ({ setEdit }: AddButtonProps) => {
  const { color } = useUserThemeFetch();

  return (
    <StyledFab
      aria-label="add"
      onClick={() => setEdit(true)}
      color="default"
      style={{ backgroundColor: color }}
    >
      <AddIcon sx={{ color: "#fff" }} />
    </StyledFab>
  );
};
