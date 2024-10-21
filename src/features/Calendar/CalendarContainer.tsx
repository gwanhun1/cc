import React, { useState } from "react";
import { useRecoilState } from "recoil";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Complate from "../../components/common/Complate";
import CustomModal from "../../components/common/CustomModal";
import { useModal } from "../../hooks/useModal";
import { currentDateState, loadState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import theme from "../../theme";
import AddPage from "./AddPage";
import Calendar from "./Calendar";

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [upload, setUpload] = useRecoilState(loadState);

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReset = () => {
    setCurrentDate(new Date());
  };

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        height={isSmDown ? 30 : 70}
      >
        {isSmDown ? (
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => openModal()}
          >
            <AddCircleIcon fontSize="inherit" sx={{ color: COLOR.pink }} />
          </IconButton>
        ) : (
          <Button
            size="medium"
            variant="contained"
            sx={{ height: isSmDown ? 30 : 40 }}
            onClick={() => openModal()}
          >
            <Typography fontSize={isSmDown ? 10 : 16}>Add Photo</Typography>
          </Button>
        )}
        {isSmDown ? (
          <IconButton aria-label="delete" size="medium" onClick={handleReset}>
            <RefreshIcon fontSize="inherit" sx={{ color: COLOR.pink }} />
          </IconButton>
        ) : (
          <Button
            size="medium"
            variant="contained"
            sx={{ height: isSmDown ? 30 : 40 }}
            onClick={handleReset}
          >
            <Typography fontSize={isSmDown ? 10 : 16}>Reset</Typography>
          </Button>
        )}
      </Box>
      <Calendar upload={upload} />
      <CustomModal isOpen={isOpen} onClose={closeModal} width="sm" height="md">
        <AddPage onClose={closeModal} />
      </CustomModal>
      {upload && <Complate />}
    </Box>
  );
};

export default CalendarContainer;
