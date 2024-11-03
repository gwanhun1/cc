import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logoW from "../../assets/logoW.png";
import useUserData from "../../hooks/useUserData";
import {
  currentDateState,
  errorState,
  fetchStatusState,
  imagesState,
  loginState,
} from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import theme from "../../theme";
import DDayBox from "./DDayBox";
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
  const [daysPassed, setDaysPassed] = useState(0);
  const { user } = useUserData();

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

  const getMenuItems = (index: number): MenuItem[] | undefined => {
    if (index === 1 && user && user.auth && user.auth.currentUser) {
      return [
        {
          key: "profile",
          label: user.auth.currentUser.displayName || "",
          onClick: handleProfileClick,
        },
        {
          key: "logout",
          label: "Logout",
          onClick: handleLogoutClick,
        },
      ];
    }
    if (index === 2) {
      return [
        {
          key: "D-Day",
          label: "D-Day",
          component: (
            <DDayBox daysPassed={daysPassed} setDaysPassed={setDaysPassed} />
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
      icon: <FavoriteIcon fontSize="small" sx={{ fontSize: 50 }} />,
      label: "favorite",
      badge: daysPassed,
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
          bgcolor: COLOR.pink,
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
                    badge={undefined}
                    hasMenu={true}
                    menuItems={mobileMenuItems}
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
