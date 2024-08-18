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
import { useMediaQuery } from "@mui/material";
import theme from "../../theme";
import logoW from "../../assets/logoW.png";
import { useRecoilState } from "recoil";
import { currentDateState } from "../../recoil/atoms";

const boxStyle = {
  display: "flex",
  alignItems: "center",
};

export default function Nav() {
  const daysPassed = useDaysPassed(new Date("2024-06-01"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const monthYear = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const goToPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const navItems = [
    { icon: <SearchIcon />, label: "search" },
    { icon: <AccountCircleIcon />, label: "account", hasMenu: true },
    {
      icon: <FavoriteIcon fontSize="large" />,
      label: "favorite",
      badge: daysPassed,
    },
  ];

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleAccountClick = () => {
    console.log("My Account clicked");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: COLOR.pink }}>
        <Toolbar>
          <Box
            sx={{
              ...boxStyle,
              justifyContent: "flex-start",
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            <img src={logoW} loading="lazy" style={{ width: 30 }} />
          </Box>

          <Box
            sx={{
              ...boxStyle,
              justifyContent: "center",
              flexGrow: 2,
            }}
          >
            <NavProfileButton
              icon={<KeyboardArrowLeftIcon />}
              label="previous month"
              onClick={goToPrevMonth}
            />
            <Typography variant="h6" component="div">
              {monthYear}
            </Typography>
            <NavProfileButton
              icon={<KeyboardArrowRightIcon />}
              label="next month"
              onClick={goToNextMonth}
              sx={{ marginLeft: 1 }}
            />
          </Box>

          <Box
            sx={{
              ...boxStyle,
              justifyContent: "flex-end",
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            {isSmDown ? (
              <NavProfileButton
                icon={<MenuIcon />}
                label="menu"
                badge={undefined}
                hasMenu={true}
                menuItems={[
                  { label: "Search", onClick: handleProfileClick },
                  { label: "Profile", onClick: handleProfileClick },
                  { label: "Love", onClick: handleAccountClick },
                ]}
              />
            ) : (
              navItems.map((item, index) => (
                <NavProfileButton
                  key={item.label}
                  badge={item.badge}
                  icon={item.icon}
                  label={item.label}
                  hasMenu={item.hasMenu}
                  sx={{ ml: index > 0 ? 1 : 0 }}
                  menuItems={
                    index === 1
                      ? [
                          { label: "Profile", onClick: handleProfileClick },
                          { label: "My Account", onClick: handleAccountClick },
                        ]
                      : undefined
                  }
                />
              ))
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
