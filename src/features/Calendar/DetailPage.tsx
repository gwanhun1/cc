import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import BasicDatePicker from "../../components/common/DatePicker";
import { useImageDelete } from "../../hooks/useImageDelete";
import { useImageEdit } from "../../hooks/useImageEdit";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import { loadState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";

interface DetailPageProps {
  onClose: () => void;
  date: string;
  title: string;
  imageUrl: string;
  imageId: string;
}

const DetailPage = ({
  onClose,
  date: dateParams,
  title: titleParams,
  imageUrl: imageUrlParams,
  imageId: imageIdParams,
}: DetailPageProps) => {
  const [upload, setUpload] = useRecoilState(loadState);

  const [selectedImage, setSelectedImage] = useState<string | File | null>(
    imageUrlParams,
  );
  const [previewImage, setPreviewImage] = useState<string | File | null>(
    imageUrlParams,
  );
  const [title, setTitle] = useState(titleParams);
  const initialDate =
    typeof dateParams === "string" ? new Date(dateParams) : dateParams;

  const [date, setDate] = useState<Date | null>(initialDate);
  const [imageId, setImageId] = useState<string>(imageIdParams);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isImageModified = selectedImage instanceof File;

  const { editImage, status, error } = useImageEdit();
  const {
    deleteImage,
    status: deleteStatus,
    error: deleteError,
  } = useImageDelete();

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

  const handleDeleteImage = async () => {
    if (!imageId || !imageUrlParams) {
      console.error("No image selected for deletion.");
      return;
    }

    try {
      await deleteImage({
        imageUrl: imageUrlParams,
        date: dateParams,
        imageId: imageIdParams,
      });

      setUpload(true);

      alert("삭제가 완료되었습니다");

      setTimeout(() => {
        setSelectedImage(null);
        setPreviewImage(null);
        setTitle("");
        setDate(null);
        setImageId("");
        setUpload(false);
        onClose();
      }, 500);
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date && title && imageId) {
      try {
        const imageData: any = {
          id: imageId,
          file: selectedImage instanceof File ? selectedImage : undefined,
          url: typeof previewImage === "string" ? previewImage : undefined,
          title,
          date: typeof date === "string" ? date : date.toISOString(),
        };

        await editImage(imageData);
        setSelectedImage(null);
        setPreviewImage(null);
        setTitle("");
        setDate(null);
        setImageId("");
        onClose();
        setUpload(true);

        setTimeout(() => {
          setUpload(false);
        }, 500);
      } catch (error) {
        console.error("Image update failed", error);
      }
    } else {
      console.error("Missing data: imageId, title, or date is missing");
    }
  };

  const { color } = useUserThemeFetch();

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color={color} fontWeight="bold">
            Your Memories
          </Typography>
          <Typography variant="subtitle2" color={COLOR.gray}>
            Beautiful Memories
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" onClick={handleDeleteImage}>
            <DeleteIcon fontSize="small" />
          </IconButton>
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
        disabled={!selectedImage || !title || !date || status === "updating"}
      >
        {status === "updating" ? "Updating..." : "Modify"}
      </Button>
      {error && <Typography color="error">Error: {error}</Typography>}
    </form>
  );
};

export default DetailPage;
