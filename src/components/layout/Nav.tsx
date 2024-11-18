import React, { useEffect, useMemo } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Divider, IconButton, useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logoW from "../../assets/logoW.png";
import { useUserThemeUpload } from "../../hooks/useThemeUpdate";
import useUserData from "../../hooks/useUserData";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import {
  currentDateState,
  errorState,
  fetchStatusState,
  imagesState,
  loginState,
} from "../../recoil/atoms";
import theme from "../../theme";
import NavProfileButton from "./NavProfileButton";

const Nav = () => {
  const setLoginState = useSetRecoilState(loginState);
  const setImagesState = useSetRecoilState(imagesState);
  const setFetchStatusState = useSetRecoilState(fetchStatusState);
  const setErrorState = useSetRecoilState(errorState);
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUserData();
  const { color } = useUserThemeFetch();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const monthYear = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  const { uploadUserTheme } = useUserThemeUpload();

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
              "=;expires=" + new Date().toUTCString() + ";path=/",
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

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const getMenuItems = useMemo(
    () => (index: number) => {
      if (index === 1 && user?.displayName) {
        return [
          {
            key: "profile",
            label: (
              <Box display="flex">
                <Typography color={color}>{user.displayName}</Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ mx: 1 }}
                />
                <Typography color={color}>{user.email}</Typography>
              </Box>
            ),
            onClick: handleProfileClick,
          },
          {
            key: "logout",
            label: (
              <Button
                variant="contained"
                onClick={handleLogoutClick}
                sx={{ my: 1 }}
              >
                <Typography>로그아웃</Typography>
              </Button>
            ),
          },
        ];
      }
      if (index === 2) {
        return [
          {
            key: "default",
            label: (
              <>
                <Typography variant="subtitle1" color={color}>
                  테마 색 변경하기
                </Typography>
                {["default", "green", "blue", "black", "gray"].map(
                  (themeName) => (
                    <IconButton
                      key={themeName}
                      onClick={() => uploadUserTheme(themeName)}
                    >
                      <CircleIcon
                        sx={{
                          color:
                            themeName === "default"
                              ? "#cf364d"
                              : themeName === "green"
                                ? "#28a745"
                                : themeName === "blue"
                                  ? "#007bff"
                                  : themeName === "black"
                                    ? "#000000"
                                    : "#6c757d",
                        }}
                      />
                    </IconButton>
                  ),
                )}
              </>
            ),
          },
        ];
      }
      return undefined;
    },
    [color, user, uploadUserTheme],
  );

  const navItems = [
    { icon: <SearchIcon />, label: "search" },
    { icon: <AccountCircleIcon />, label: "account", hasMenu: true },
    { icon: <CircleIcon />, label: "circle", hasMenu: true },
  ];

  const mobileMenuItems = [
    { key: "search", label: "Search", onClick: handleProfileClick },
    { key: "profile", label: "Profile", onClick: handleProfileClick },
    { key: "love", label: "Love", onClick: handleLogoutClick },
  ];

  const goToHome = () => {
    window.location.href = "/";
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: color,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Toolbar sx={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexGrow: 1,
              flexBasis: 0,
              cursor: "pointer",
            }}
            onClick={goToHome}
          >
            <img src={logoW} loading="lazy" style={{ width: 30 }} alt="Logo" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 2 }}>
            {(window.location.pathname.includes("calendar") ||
              window.location.pathname.includes("todoList")) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            {storedToken && (
              <>
                {isSmDown ? (
                  <NavProfileButton
                    icon={<MenuIcon />}
                    label="menu"
                    hasMenu={true}
                    menuItems={mobileMenuItems}
                  />
                ) : (
                  navItems.map((item, index) => (
                    <NavProfileButton
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      hasMenu={item.hasMenu}
                      sx={{ ml: index > 0 ? 1 : 0 }}
                      menuItems={getMenuItems(index)}
                    />
                  ))
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
