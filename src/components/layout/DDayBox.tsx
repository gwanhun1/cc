import { Box, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";

const DDayBox = ({
  daysPassed,
  setDaysPassed,
}: {
  daysPassed: number;
  setDaysPassed: (value: number | ((prevState: number) => number)) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // 선택된 날짜 상태

  const handleDatePicker = () => {
    setOpen((prev) => !prev);
  };

  const handleDateChange = (newValue) => {
    setValue(newValue); // 날짜 값 업데이트

    if (newValue) {
      // 선택한 날짜가 있을 경우
      const selectedDate = dayjs(newValue);
      const currentDate = dayjs(); // 현재 날짜
      const difference = currentDate.diff(selectedDate, "day"); // 일수 계산
      setDaysPassed(difference); // 경과된 날짜 상태 업데이트
    }

    setOpen(false); // 날짜 선택 후 모달 닫기
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
            onChange={handleDateChange} // 날짜 변경 시 호출
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
