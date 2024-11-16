import React, { useEffect } from "react";
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

interface UserAuth {
  currentUser?: {
    displayName?: string | null;
  };
}

interface User {
  auth?: UserAuth;
}

interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  onClick?: () => void;
  component?: React.ReactNode;
}

const boxStyle = {
  display: "flex",
  alignItems: "center",
};

export default function Nav() {
  const setLoginState = useSetRecoilState(loginState);
  const setImagesState = useSetRecoilState(imagesState);
  const setFetchStatusState = useSetRecoilState(fetchStatusState);
  const setErrorState = useSetRecoilState(errorState);
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const monthYear = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;
  const storedToken = localStorage.getItem("authToken");
  const { user } = useUserData();
  const { color } = useUserThemeFetch();

  useEffect(() => {
    setCurrentDate(new Date(currentDate));
  }, []);

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

  const goToHome = () => {
    window.location.href = "/";
  };

  const { uploadUserTheme } = useUserThemeUpload();

  const getMenuItems = (index: number): MenuItem[] | undefined => {
    if (index === 1 && user && user.displayName) {
      return [
        {
          key: "profile",
          label: (
            <Box display="flex">
              <Typography color={color}>{user.displayName || ""}</Typography>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ mx: 1 }}
              />
              <Typography color={color}>{user.email || ""}</Typography>
            </Box>
          ),
          onClick: handleProfileClick,
        },
        {
          key: "logout",
          label: (
            <>
              <Button
                variant="contained"
                onClick={handleLogoutClick}
                sx={{ my: 1 }}
              >
                <Typography>로그아웃</Typography>
              </Button>
            </>
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
              <IconButton onClick={() => uploadUserTheme("default")}>
                <CircleIcon sx={{ color: "#cf364d" }} />
              </IconButton>
              <IconButton onClick={() => uploadUserTheme("green")}>
                <CircleIcon sx={{ color: "#28a745" }} />
              </IconButton>
              <IconButton onClick={() => uploadUserTheme("blue")}>
                <CircleIcon sx={{ color: "#007bff" }} />
              </IconButton>
              <IconButton onClick={() => uploadUserTheme("black")}>
                <CircleIcon sx={{ color: "#000000" }} />
              </IconButton>
              <IconButton onClick={() => uploadUserTheme("gray")}>
                <CircleIcon sx={{ color: "#6c757d" }} />
              </IconButton>
            </>
          ),
        },
      ];
    }

    return undefined;
  };

  const navItems = [
    { icon: <SearchIcon />, label: "search" },
    { icon: <AccountCircleIcon />, label: "account", hasMenu: true },
    {
      icon: <CircleIcon />,
      label: "circle",
      hasMenu: true,
    },
  ];

  const mobileMenuItems = [
    { key: "search", label: "Search", onClick: handleProfileClick },
    { key: "profile", label: "Profile", onClick: handleProfileClick },
    { key: "love", label: "Love", onClick: handleLogoutClick },
  ];

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
              ...boxStyle,
              justifyContent: "flex-start",
              flexGrow: 1,
              flexBasis: 0,
              cursor: "pointer",
            }}
            onClick={goToHome}
          >
            <img src={logoW} loading="lazy" style={{ width: 30 }} alt="Logo" />
          </Box>
          <Box
            sx={{
              ...boxStyle,
              justifyContent: "center",
              flexGrow: 2,
            }}
          >
            {(window.location.pathname.includes("calendar") ||
              window.location.pathname.includes("todoList")) && (
              <>
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
              </>
            )}
          </Box>
          <Box
            sx={{
              ...boxStyle,
              justifyContent: "flex-end",
              flexGrow: 1,
              flexBasis: 0,
            }}
          >
            {storedToken ? (
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
                      sx={{
                        ml: index > 0 ? 1 : 0,
                      }}
                      menuItems={getMenuItems(index)}
                    />
                  ))
                )}
              </>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
