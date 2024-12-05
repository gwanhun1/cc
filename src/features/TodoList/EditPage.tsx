import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useIsMobile from "../../hooks/useIsMobile";
import { useTodoUpload } from "../../hooks/useTodoUpload";

interface EditPageProps {
  setEdit: (value: boolean) => void;
  refetch: () => void;
}

const EditPage: React.FC<EditPageProps> = React.memo(({ setEdit, refetch }) => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [memo, setMemo] = useState<string>("");
  const { uploadTodoItem, status, error } = useTodoUpload();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value);
  }, []);

  const handleDateChange = useCallback((newValue: Dayjs | null) => {
    setDate(newValue);
  }, []);

  const handleCancel = useCallback(() => {
    setEdit(false);
  }, [setEdit]);

  const handleSave = useCallback(async () => {
    if (!memo || memo.length === 0) {
      alert("일정을 입력해주세요.");
      return;
    }
    if (!date) {
      alert("날짜를 선택해주세요.");
      return;
    }

    try {
      await uploadTodoItem({
        text: memo,
        date: date.toISOString(),
      });
      refetch();
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다.");
    }
  }, [memo, date, uploadTodoItem, refetch]);

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
          value={memo}
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
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={status === "uploading"}
          >
            저장
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
});

export default EditPage;
