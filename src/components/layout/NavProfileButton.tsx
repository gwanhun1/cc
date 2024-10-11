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
  label: string | React.ReactNode; // label의 타입을 수정
  onClick?: () => void;
}

interface NavProfileButtonProps {
  icon: React.ReactNode;
  label: string | React.ReactNode; // label의 타입을 수정
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
        aria-label={typeof label === "string" ? label : undefined} // label이 문자열일 때만 aria-label 설정
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
          {menuItems.map((item, index) => (
            <>
              {item.onClick ? (
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
              ) : (
                <Typography textAlign="center" color={COLOR.hotpink}>
                  {item.label}
                </Typography>
              )}
            </>
          ))}
        </Menu>
      )}
    </Box>
  );
};

export default NavProfileButton;
