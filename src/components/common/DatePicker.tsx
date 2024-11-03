import React, { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { useRecoilState } from "recoil";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import { currentDateState } from "../../recoil/atoms";
import { formatYearMonth } from "../../utils/formatYearMonth";

dayjs.extend(utc); // Dayjs에 UTC 플러그인 적용

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

  const [currentDate] = useRecoilState(currentDateState);

  const { images } = useMonthlyImages(formatYearMonth(currentDate));

  const disabledDates = useMemo(() => {
    return new Set(
      images.map((img) => dayjs(img.date).utc().format("YYYY-MM-DD")),
    );
  }, [images]);

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.utc().format("YYYY-MM-DD");

    return disabledDates.has(dateString);
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
          shouldDisableDate={shouldDisableDate}
          maxDate={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
