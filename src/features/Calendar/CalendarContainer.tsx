import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { AuthGuard } from "../../components/auth/authGuard";
import Complete from "../../components/common/Complete";
import CustomModal from "../../components/common/CustomModal";
import { useModal } from "../../hooks/useModal";
import { currentDateState, loadState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import theme from "../../theme";
import AddPage from "./AddPage";
import Calendar from "./Calendar";

const RotatingIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    animation: "spin 0.8s linear infinite",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [upload, setUpload] = useRecoilState(loadState);
  const navigate = useNavigate();

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleReset = () => {
    setCurrentDate(new Date());
  };

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <AuthGuard>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        bgcolor="#fff"
        borderRadius={2}
        p={isMdDown ? 1 : 3}
        sx={{
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          boxSizing: "border-box",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          mb={isSmDown ? 0 : 1}
        >
          <Box>
            <Button
              variant="outlined"
              sx={{
                mt: isSmDown ? 1.5 : 4,
                padding: isSmDown ? 0.5 : undefined,
              }}
              onClick={() => navigate("/todoList")}
            >
              <Typography
                variant={isSmDown ? "body1" : "subtitle2"}
                fontSize={isSmDown ? 10 : 20}
              >
                TODOLIST
              </Typography>
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <RotatingIconButton
              aria-label="refresh"
              size="medium"
              onClick={handleReset}
            >
              <RefreshIcon
                fontSize="inherit"
                sx={{ color: COLOR.pink, fontSize: isSmDown ? 30 : 60 }}
              />
            </RotatingIconButton>
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => openModal()}
            >
              <AddCircleIcon
                fontSize="inherit"
                sx={{ color: COLOR.pink, fontSize: isSmDown ? 30 : 60 }}
              />
            </IconButton>
          </Box>
        </Box>
        <Calendar upload={upload} />
        <CustomModal
          isOpen={isOpen}
          onClose={closeModal}
          width="sm"
          height="md"
        >
          <AddPage onClose={closeModal} />
        </CustomModal>
        {upload && <Complete />}
      </Box>
    </AuthGuard>
  );
};

export default CalendarContainer;
