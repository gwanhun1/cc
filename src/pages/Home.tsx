import { Box, Button } from "@mui/material";
import React from "react";
import { useModal } from "../hooks/useModal";
import LoginPage from "../components/auth/LoginPage";
import height from "../../node_modules/dom-helpers/esm/height";
import CustomModal from "../components/common/CustomModal";

const boxStyle = {
  display: "flex",
  alignItems: "center",
  minHeight: "100vh",
  flex: 1,
};

const Home = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Box sx={{ ...boxStyle, justifyContent: "center" }}>
      <Button variant="contained" color="primary" onClick={openModal}>
        Open Modal
      </Button>
      <CustomModal isOpen={isOpen} onClose={closeModal} width="md" height="lg">
        <LoginPage />
      </CustomModal>
    </Box>
  );
};

export default Home;
