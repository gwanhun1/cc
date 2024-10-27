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
// UTC 플러그인 추가
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

  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);

  const { images, refetch } = useMonthlyImages(formatYearMonth(currentDate));

  // 이미지가 있는 날짜들을 Set으로 저장
  const disabledDates = useMemo(() => {
    return new Set(
      images.map((img) => dayjs(img.date).utc().format("YYYY-MM-DD")),
    ); // UTC 형식으로 변환
  }, [images]);

  const shouldDisableDate = (date: Dayjs) => {
    const dateString = date.utc().format("YYYY-MM-DD"); // Dayjs 객체를 UTC로 변환하여 YYYY-MM-DD 형식으로 변환

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
