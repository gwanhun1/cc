import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";
import { useModal } from "../hooks/useModal";
import LoginPage from "../components/auth/LoginPage";
import height from "../../node_modules/dom-helpers/esm/height";
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

      <CustomModal isOpen={isOpen} onClose={closeModal} width="sm" height="lg">
        <LoginPage />
      </CustomModal>
    </Box>
  );
};

export default Home;
