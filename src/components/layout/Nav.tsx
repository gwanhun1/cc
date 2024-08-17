import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { COLOR } from "../../style/constants";
import useDaysPassed from "../../hooks/useDatingPeriod";
import NavProfileButton from "./NavProfileButton";

const boxStyle = {
  display: "flex",
  alignItems: "center",
};

export default function Nav() {
  const daysPassed = useDaysPassed(new Date("2024-06-01"));

  const navItems = [
    { icon: <SearchIcon />, label: "search" },
    { icon: <AccountCircleIcon />, label: "account", hasMenu: true },
    {
      icon: <FavoriteIcon fontSize="large" />,
      label: "favorite",
      badge: daysPassed,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: COLOR.pink }}>
        <Toolbar>
          <Box sx={{ ...boxStyle, justifyContent: "flex-start", flexGrow: 1 }}>
            <NavProfileButton
              icon={<MenuIcon />}
              label="menu"
              sx={{ mr: 2 }}
              badge={undefined}
              hasMenu={undefined}
            />
          </Box>

          <Box sx={{ ...boxStyle, justifyContent: "center", flexGrow: 10 }}>
            <NavProfileButton
              icon={<KeyboardArrowLeftIcon />}
              label="previous month"
              sx={{ mr: 2 }}
              badge={undefined}
              hasMenu={undefined}
            />
            <Typography variant="h6" component="div">
              2023년 8월
            </Typography>
            <NavProfileButton
              icon={<KeyboardArrowRightIcon />}
              label="next month"
              sx={{ ml: 2 }}
              badge={undefined}
              hasMenu={undefined}
            />
          </Box>

          <Box sx={{ ...boxStyle, justifyContent: "flex-end", flexGrow: 1 }}>
            {navItems.map((item, index) => (
              <NavProfileButton
                key={item.label}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                hasMenu={item.hasMenu}
                sx={{ ml: index > 0 ? 1 : 0 }}
              />
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
