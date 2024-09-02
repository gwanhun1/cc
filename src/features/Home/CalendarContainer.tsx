import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Calendar from "./Calendar";
import { useRecoilState } from "recoil";
import { currentDateState, loadState } from "../../recoil/atoms";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../components/common/CustomModal";
import AddPage from "./AddPage";
import Complate from "../../components/common/Complate";

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
        height={isSmDown ? 50 : 70}
      >
        <Button
          size="medium"
          variant="contained"
          sx={{ height: isSmDown ? 30 : 40 }}
          onClick={() => openModal()}
        >
          <Typography fontSize={isSmDown ? 10 : 16}>Add Photo</Typography>
        </Button>
        <Button
          size="medium"
          variant="contained"
          sx={{ height: isSmDown ? 30 : 40 }}
          onClick={handleReset}
        >
          <Typography fontSize={isSmDown ? 10 : 16}>Reset</Typography>
        </Button>
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
