import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { COLOR } from "../../style/constants";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import BasicDatePicker from "../../components/common/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useImageEdit } from "../../hooks/useImageEdit";
import { loadState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { useImageDelete } from "../../hooks/useImageDelete";

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
    imageUrlParams
  );
  const [previewImage, setPreviewImage] = useState<string | File | null>(
    imageUrlParams
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
        imageUrl: imageUrlParams, // Firebase Storage URL
        date: dateParams, // 해당 이미지가 속한 날짜
        imageId: imageIdParams, // Firestore 문서의 ID
      });

      // 상태 업데이트
      setUpload(true); // 데이터 리로드를 위한 상태 변경

      alert("삭제가 완료되었습니다");

      setTimeout(() => {
        setSelectedImage(null);
        setPreviewImage(null);
        setTitle("");
        setDate(null);
        setImageId("");
        setUpload(false); // 리렌더링 완료
        onClose(); // 모달 닫기
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
          date: typeof date === "string" ? date : date.toISOString(), // Convert to string if it's a Date object
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

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h6" color={COLOR.pink} fontWeight="bold">
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
