import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface BasicDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function BasicDatePicker({
  value,
  onChange,
}: BasicDatePickerProps) {
  const handleDateChange = (newValue: Dayjs | null) => {
    onChange(newValue ? newValue.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="날짜를 선택해주세요."
          slotProps={{
            textField: { size: "small", fullWidth: true },
          }}
          value={value ? dayjs(value) : null}
          onChange={handleDateChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
