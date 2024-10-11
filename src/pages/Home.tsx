import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useModal } from "../hooks/useModal";
import LoginPage from "../components/auth/LoginPage";
import CustomModal from "../components/common/CustomModal";
import CalendarContainer from "../features/Home/CalendarContainer";
import theme from "../theme";

const boxStyle = {
  display: "flex",
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
        padding: isSmDown ? 0.5 : 0,
        marginTop: isSmDown ? 2.5 : 8,
        justifyContent: "center",
        minHeight: "77vh",
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
      <CustomModal isOpen={isOpen} width="sm" height="lg">
        <LoginPage closeModal={closeModal} />
      </CustomModal>
    </Box>
  );
};

export default Home;
