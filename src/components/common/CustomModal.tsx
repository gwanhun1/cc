import React from "react";
import { Modal, Box, ModalProps, Stack, Button } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import CustomBackdrop from "./CustomBackDrop";

interface CustomModalProps extends Omit<ModalProps, "children" | "open"> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  width?: "xs" | "sm" | "md" | "lg" | "xl";
  height?: "xs" | "sm" | "md" | "lg" | "xl";
}

const modalSizes = {
  width: {
    xs: 300,
    sm: 400,
    md: 500,
    lg: 600,
    xl: 700,
  },
  height: {
    xs: 300,
    sm: 400,
    md: 500,
    lg: 550,
    xl: 650,
  },
};

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  width = "md",
  height = "md",
  ...modalProps
}) => {
  const modalStyles: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    outline: "none",
    padding: 2,
    borderRadius: 3,
    width: modalSizes.width[width],
    height: modalSizes.height[height],
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width:600px)": {
      width: "98%",
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      BackdropComponent={CustomBackdrop}
      {...modalProps}
    >
      <Box sx={modalStyles}>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button variant="outlined" onClick={onClose}>
            취소
          </Button>
          {onConfirm && (
            <Button
              variant="contained"
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose();
              }}
            >
              확인
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CustomModal;
