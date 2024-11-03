import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const DDayBox = ({
  daysPassed,
  setDaysPassed,
}: {
  daysPassed: number;
  setDaysPassed: (value: number | ((prevState: number) => number)) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleDatePicker = () => {
    setOpen((prev) => !prev);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);

    if (newValue) {
      const selectedDate = dayjs(newValue);
      const currentDate = dayjs();
      const difference = currentDate.diff(selectedDate, "day");
      setDaysPassed(difference);
    }

    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Typography
        variant="subtitle1"
        fontWeight={700}
        mb={2}
        whiteSpace={"nowrap"}
      >
        {value ? dayjs(value).format("YYYY.MM.DD") : "만난 날짜를 선택하세요."}
      </Typography>
      <Typography variant="body1" mb={1}>
        {daysPassed > 0 ? `D + ${daysPassed}` : ""}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {open ? (
          <DatePicker
            label="만난 날짜를 선택해주세요."
            slotProps={{
              textField: { size: "small", fullWidth: true },
            }}
            value={value}
            onChange={handleDateChange}
          />
        ) : (
          <Button variant="contained" onClick={handleDatePicker}>
            <Typography variant="h5" fontSize={12} whiteSpace="nowrap">
              날짜 입력하러가기
            </Typography>
          </Button>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default DDayBox;
