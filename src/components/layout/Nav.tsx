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
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentDateState,
  errorState,
  fetchStatusState,
  imagesState,
  loginState,
} from "../../recoil/atoms";
import useUserData from "../../hooks/useUserData";
import { getAuth, signOut } from "firebase/auth";

const boxStyle = {
  display: "flex",
  alignItems: "center",
};

export default function Nav() {
  const setLoginState = useSetRecoilState(loginState);
  const setImagesState = useSetRecoilState(imagesState);
  const setFetchStatusState = useSetRecoilState(fetchStatusState);
  const setErrorState = useSetRecoilState(errorState);

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
      icon: <FavoriteIcon fontSize="small" sx={{ fontSize: 30 }} />,
      label: "favorite",
      badge: daysPassed,
    },
  ];

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleLogoutClick = async () => {
    const auth = getAuth();

    if (window.confirm("정말 로그아웃하시겠습니까? 😢")) {
      try {
        await signOut(auth);
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        setLoginState({ id: "", password: "", name: "" });
        setImagesState([]);
        setFetchStatusState("idle");
        setErrorState(null);
        location.reload();
      } catch (error) {
        alert("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  const { user, userData, loading } = useUserData();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: COLOR.pink,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Toolbar sx={{ width: "90%" }}>
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
              sx={{ padding: isSmDown ? "4px" : "8px" }}
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
                  { label: "Love", onClick: handleLogoutClick },
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
                  sx={{
                    ml: index > 0 ? 1 : 0,
                  }}
                  menuItems={
                    index === 1 && user
                      ? [
                          {
                            label: user.auth.currentUser.displayName ?? "",
                            onClick: handleProfileClick,
                          },
                          { label: "Logout", onClick: handleLogoutClick },
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
    // </AppBar>
  );
}
