import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { COLOR } from "../../style/constants";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const AddPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <>
      <Typography variant="h6" color={COLOR.pink} fontWeight="bold">
        Save Image and Title
      </Typography>
      <Typography variant="subtitle2" color={COLOR.gray}>
        Upload an image and enter a title
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 3,
          border: 2,
          borderColor: COLOR.gray,
          borderRadius: 1,
          height: "50%",
        }}
      >
        <ImageSearchIcon fontSize="large" color="disabled" />
      </Box>

      <TextField
        id="outlined-basic"
        label="제목"
        variant="outlined"
        size="small"
        fullWidth
      />
    </>
  );
};

export default AddPage;
