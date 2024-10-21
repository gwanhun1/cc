import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { useNavMenu } from "../../hooks/useNavMenu";
import { COLOR } from "../../style/constants";

const NavMenuButton = ({ icon, label, badge, hasMenu, children, ...props }) => {
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
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: (event) => {
                if (child.props.onClick) child.props.onClick(event);
                handleCloseMenu();
              },
            }),
          )}
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

export default NavMenuButton;
