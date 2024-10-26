import React, { ChangeEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useIsMobile from "../../hooks/useIsMobile";
import { useTodoUpload } from "../../hooks/useTodoUpload";

type EditPageProps = { setEdit: any };

const EditPage = ({ setEdit }: EditPageProps) => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Dayjs | null | undefined>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    setOpen(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  //일정 등록
  const { uploadTodoItem, status, error } = useTodoUpload();

  const handleSave = async () => {
    if ((memo && memo.length > 0) || date !== null) {
      await uploadTodoItem({
        text: memo,
        dueDate: date ? date.toDate() : null,
      });
    } else {
      alert("빠진 곳이 있습니다.");
    }
  };

  //모달 닫기
  useEffect(() => {
    if (status === "success") {
      setEdit(false);
    }
  }, [status, setEdit]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        bgcolor="#f5f5f5"
        borderRadius={2}
        p={isMobile ? 1 : 3}
        sx={{
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <DatePicker
            label="날짜를 선택해주세요."
            slotProps={{
              textField: { size: "small", fullWidth: true },
            }}
            value={date}
            onChange={handleDateChange}
            minDate={dayjs()}
          />
        </Box>
        <TextField
          fullWidth
          label="일정을 적어주세요."
          sx={{ marginTop: 1 }}
          value={memo || ""}
          onChange={handleChange}
          size="small"
        />

        {status === "uploading" && <p>업로드 중...</p>}
        {status === "success" && <p>할 일이 추가되었습니다!</p>}
        {status === "error" && <p>오류: {error}</p>}
        <Box width="100%" textAlign="end" marginTop={2}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{ marginRight: 1 }}
          >
            취소
          </Button>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default EditPage;
