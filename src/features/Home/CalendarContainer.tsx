import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import Calendar from "./Calendar";
import { useRecoilState } from "recoil";
import { currentDateState } from "../../recoil/atoms";
import theme from "../../theme";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../components/common/CustomModal";
import AddPage from "./AddPage";

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
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
          sx={{ height: 40 }}
          onClick={() => openModal()}
        >
          Add Photo
        </Button>
        <Button
          size="medium"
          variant="contained"
          sx={{ height: 40 }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
      <Calendar />

      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={() => {}}
        width="sm"
        height="md"
      >
        <AddPage />
      </CustomModal>
    </Box>
  );
};

export default CalendarContainer;
