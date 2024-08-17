import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { COLOR } from "../../style/constants";
import { useNavMenu } from "../../hooks/useNavMenu";

const NavProfileButton = ({ icon, label, badge, hasMenu, ...props }) => {
  const { anchorEl, isOpen, handleOpenMenu, handleCloseMenu } = useNavMenu();

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
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
          <MenuItem onClick={handleCloseMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseMenu}>
            <Typography textAlign="center">My Account</Typography>
          </MenuItem>
        </Menu>
      )}

      {badge && (
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-25%, -50%)",
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
