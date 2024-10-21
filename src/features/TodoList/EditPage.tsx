import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import BasicDatePicker from "../../components/common/DatePicker";
import useIsMobile from "../../hooks/useIsMobile";
import { COLOR } from "../../style/constants";

const EditPage = () => {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | null>(null);
  const [memo, setMemo] = useState<string | null>(null);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setMemo(value);
  };
  return (
    <Box
      bgcolor="#fff"
      borderRadius={2}
      p={isMobile ? 1 : 3}
      sx={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
      }}
    >
      <BasicDatePicker value={date} onChange={(newDate) => setDate(newDate)} />
      <TextField
        fullWidth
        sx={{ marginTop: 1, bgcolor: "#f5f5f5" }}
        value={memo}
        onChange={(event) => handleChange(event)}
      />

      <Box width="100%" textAlign="end">
        <Button>저장</Button>
      </Box>
    </Box>
  );
};

export default EditPage;
