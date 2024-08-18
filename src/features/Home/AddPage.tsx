import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { COLOR } from "../../style/constants";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import BasicDatePicker from "../../components/common/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";

const AddPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color={COLOR.pink} fontWeight="bold">
            Save Image and Title
          </Typography>
          <Typography variant="subtitle2" color={COLOR.gray}>
            Upload an image and enter a title
          </Typography>
        </Box>
        {true && (
          <Box>
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 3,
          border: 2,
          borderColor: "gray",
          borderRadius: 1,
          height: "50%",
          cursor: "pointer",
          backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handleBoxClick}
      >
        {!selectedImage && (
          <ImageSearchIcon fontSize="large" color="disabled" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>

      <BasicDatePicker />
      <TextField
        id="outlined-basic"
        label="제목"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginTop: 1 }}
      />
    </>
  );
};

export default AddPage;
