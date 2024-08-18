import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Calendar from "./Calendar";
import { useRecoilState } from "recoil";
import { currentDateState } from "../../recoil/atoms";

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const handleReset = () => {
    setCurrentDate(new Date());
  };

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" justifyContent="space-between" mb={3} height={70}>
        <Button size="medium" variant="contained" sx={{ height: 40 }}>
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
    </Box>
  );
};

export default CalendarContainer;
