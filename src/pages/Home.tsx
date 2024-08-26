import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useModal } from "../hooks/useModal";
import LoginPage from "../components/auth/LoginPage";
import CustomModal from "../components/common/CustomModal";
import CalendarContainer from "../features/Home/CalendarContainer";
import theme from "../theme";

const boxStyle = {
  display: "flex",
  minHeight: "100vh",
  flex: 1,
};

const Home = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      return;
    } else {
      openModal();
    }
  }, [token]);

  return (
    <Box
      sx={{
        ...boxStyle,
        padding: isSmDown ? 2 : 0,
        marginTop: isSmDown ? 5 : 8,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          ...boxStyle,
          marginTop: 5,
          marginBottom: isSmDown ? 5 : 8,
          justifyContent: "center",
          maxWidth: "999px",
        }}
      >
        <CalendarContainer />
      </Box>
      <CustomModal isOpen={isOpen} width="sm" height="md">
        <LoginPage closeModal={closeModal} />
      </CustomModal>
    </Box>
  );
};

export default Home;
