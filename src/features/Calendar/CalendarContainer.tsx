import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AuthGuard } from "../../components/auth/authGuard";
import Complete from "../../components/common/Complete";
import CustomModal from "../../components/common/CustomModal";
import { useModal } from "../../hooks/useModal";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import { loadState } from "../../recoil/atoms";
import theme from "../../theme";
import AddPage from "./AddPage";

const Calendar = React.lazy(() => import("./Calendar"));

const CalendarContainer = React.memo(() => {
  const upload = useRecoilValue(loadState);
  const navigate = useNavigate();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { isOpen, openModal, closeModal } = useModal();
  const { color } = useUserThemeFetch();

  const handleNavigate = useCallback(() => {
    navigate("/todoList");
  }, [navigate]);

  const containerStyles = useMemo(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    bgcolor: color === "#000000" ? "#0505066a" : "#fff",
    borderRadius: 2,
    p: isMdDown ? 1 : 3,
    boxShadow: "5px 4px 10px 6px rgba(36, 36, 36, 0.3)",
    boxSizing: "border-box",
  }), [color, isMdDown]);

  const buttonStyle = useMemo(() => ({
    mt: isSmDown ? 1.5 : 4,
    padding: isSmDown ? 0.5 : undefined,
  }), [isSmDown]);

  const iconStyle = useMemo(() => ({
    color: color,
    fontSize: isSmDown ? 30 : 60,
  }), [color, isSmDown]);

  const headerStyle = useMemo(() => ({
    display: "flex",
    justifyContent: "space-between",
    mb: isSmDown ? 0 : 1,
  }), [isSmDown]);

  return (
    <AuthGuard>
      <Box sx={containerStyles}>
        <Box sx={headerStyle}>
          <Box>
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={handleNavigate}
            >
              <Typography
                variant={isSmDown ? "body1" : "subtitle2"}
                fontSize={isSmDown ? 10 : 20}
              >
                TODOLIST
              </Typography>
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton aria-label="add" size="medium" onClick={openModal}>
              <AddCircleIcon
                fontSize="inherit"
                sx={iconStyle}
              />
            </IconButton>
          </Box>
        </Box>
        <Calendar upload={upload} />
        <CustomModal
          isOpen={isOpen}
          onClose={closeModal}
          width="sm"
          height="md"
        >
          <AddPage onClose={closeModal} />
        </CustomModal>
        {upload && <Complete />}
      </Box>
    </AuthGuard>
  );
});

export default CalendarContainer;
