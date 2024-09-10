import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { COLOR } from "../../style/constants";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import BasicDatePicker from "../../components/common/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useRecoilState } from "recoil";
import { loadState } from "../../recoil/atoms";

interface AddPageProps {
  onClose: () => void;
}

const AddPage = ({ onClose }: AddPageProps) => {
  const [upload, setUpload] = useRecoilState(loadState);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImage, status, error } = useImageUpload();

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedImage && title && date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const dateString = `${year}-${month}-${day}`;

      try {
        await uploadImage({
          file: selectedImage,
          title,
          date: date.toISOString(),
        });
        setSelectedImage(null);
        setPreviewImage(null);
        setTitle("");
        setDate(null);
        onClose();
        setUpload(true);

        setTimeout(() => {
          setUpload(false);
        }, 500);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color={COLOR.pink} fontWeight="bold">
            Save Memories
          </Typography>
          <Typography variant="subtitle2" color={COLOR.gray}>
            Upload an image and enter a title
          </Typography>
        </Box>
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
          height: "200px",
          cursor: "pointer",
          backgroundImage: previewImage ? `url(${previewImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handleBoxClick}
      >
        {!previewImage && <ImageSearchIcon fontSize="large" color="disabled" />}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>

      <BasicDatePicker value={date} onChange={(newDate) => setDate(newDate)} />
      <TextField
        id="outlined-basic"
        label="제목"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ marginTop: 1, marginBottom: 1 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedImage || !title || !date || status === "uploading"}
      >
        {status === "uploading" ? "Uploading..." : "Save"}
      </Button>
      {error && <Typography color="error">Error: {error}</Typography>}
    </form>
  );
};

export default AddPage;
