import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { COLOR } from "../../style/constants";
import { useNavMenu } from "../../hooks/useNavMenu";
import { SxProps, Theme } from "@mui/system";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

interface NavProfileButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  hasMenu?: boolean;
  menuItems?: MenuItemProps[];
  sx?: SxProps<Theme>;
}

const NavProfileButton: React.FC<NavProfileButtonProps> = ({
  icon,
  label,
  badge,
  hasMenu,
  menuItems = [],
  sx,
  ...props
}) => {
  const { anchorEl, isOpen, handleOpenMenu, handleCloseMenu } = useNavMenu();

  return (
    <Box sx={{ position: "relative", display: "inline-flex", ...sx }}>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label={label}
        onClick={hasMenu ? handleOpenMenu : undefined}
        {...props}
      >
        {icon}
      </IconButton>

      {hasMenu && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={isOpen}
          onClose={handleCloseMenu}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.onClick();
                handleCloseMenu();
              }}
            >
              <Typography textAlign="center" color={COLOR.hotpink}>
                {item.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      )}

      {badge && (
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-100%, -50%)",
            fontSize: "0.75rem",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
          color={COLOR.hotpink}
        >
          {badge}
        </Typography>
      )}
    </Box>
  );
};

export default NavProfileButton;
