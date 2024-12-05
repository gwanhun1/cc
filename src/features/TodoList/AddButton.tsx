import React, { memo, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, styled } from "@mui/material";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";

interface StyledFabProps {
  customColor: string;
}

const StyledFab = styled(Fab)<StyledFabProps>(({ theme, customColor }) => ({
  position: "absolute",
  bottom: 24,
  right: 24,
  backgroundColor: customColor,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface AddButtonProps {
  setEdit: (value: boolean) => void;
}

export const AddButton = memo<AddButtonProps>(({ setEdit }) => {
  const { color } = useUserThemeFetch();
  
  const handleClick = useCallback(() => {
    setEdit(true);
  }, [setEdit]);

  return (
    <StyledFab
      aria-label="add"
      onClick={handleClick}
      customColor={color}
    >
      <AddIcon sx={{ color: "#fff" }} />
    </StyledFab>
  );
});
