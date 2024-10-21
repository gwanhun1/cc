import React from "react";
import { Box, Button, Modal, ModalProps, Stack } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import CustomBackdrop from "./CustomBackdrop";

interface CustomModalProps extends Omit<ModalProps, "children" | "open"> {
  isOpen: boolean;
  onClose?: () => void;
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
    md: 520,
    lg: 550,
    xl: 650,
  },
};

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  width = "md",
  height = "md",
  ...modalProps
}: CustomModalProps) => {
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
        if (reason !== "backdropClick" && onClose) {
          onClose();
        }
      }}
      BackdropComponent={CustomBackdrop}
      {...modalProps}
    >
      <Box sx={modalStyles}>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          {onClose && (
            <Button variant="outlined" onClick={onClose}>
              취소
            </Button>
          )}
          {onConfirm && (
            <Button
              variant="contained"
              onClick={() => {
                if (onConfirm) onConfirm();
                onClose && onClose();
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
