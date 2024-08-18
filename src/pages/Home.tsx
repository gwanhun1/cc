import { Box, Button } from "@mui/material";
import React from "react";
import { useModal } from "../hooks/useModal";
import LoginPage from "../components/auth/LoginPage";
import height from "../../node_modules/dom-helpers/esm/height";
import CustomModal from "../components/common/CustomModal";
import CalendarContainer from "../components/Home/CalendarContainer";

const boxStyle = {
  display: "flex",
  marginTop: 8,
  minHeight: "100vh",
  flex: 1,
};

const Home = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Box
      sx={{
        ...boxStyle,
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          ...boxStyle,
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
