import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/system";
import { useNavMenu } from "../../hooks/useNavMenu";
import { COLOR } from "../../style/constants";

interface MenuItemProps {
  label: string | React.ReactNode;
  onClick?: () => void;
}

interface NavProfileButtonProps {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  badge?: number;
  hasMenu?: boolean;
  menuItems?: MenuItemProps[];
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const NavProfileButton = ({
  icon,
  label,
  badge,
  hasMenu,
  menuItems = [],
  sx,
  ...props
}: NavProfileButtonProps) => {
  const { anchorEl, isOpen, handleOpenMenu, handleCloseMenu } = useNavMenu();

  return (
    <Box sx={{ position: "relative", display: "inline-flex", ...sx }}>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label={typeof label === "string" ? label : undefined}
        onClick={hasMenu ? handleOpenMenu : undefined}
        {...props}
      >
        {icon}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.3rem",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          <Typography color={COLOR.hotpink}>{badge}</Typography>
        </Box>
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
          {menuItems.map((item, index) =>
            item.onClick ? (
              <MenuItem
                key={index}
                onClick={() => {
                  item.onClick!();
                  handleCloseMenu();
                }}
              >
                <Typography textAlign="center" color={COLOR.hotpink}>
                  {item.label}
                </Typography>
              </MenuItem>
            ) : (
              <Typography key={index} textAlign="center" color={COLOR.hotpink}>
                {item.label}
              </Typography>
            ),
          )}
        </Menu>
      )}
    </Box>
  );
};

export default NavProfileButton;
