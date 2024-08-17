import React from "react";

export const useNavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return {
    anchorEl,
    isOpen,
    handleOpenMenu,
    handleCloseMenu,
  };
};
