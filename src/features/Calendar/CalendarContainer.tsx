import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
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
import Calendar from "./Calendar";

const CalendarContainer = () => {
  const [upload] = useRecoilState(loadState);
  const navigate = useNavigate();

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { isOpen, openModal, closeModal } = useModal();

  const { color } = useUserThemeFetch();

  return (
    <AuthGuard>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        bgcolor={color === "#000000" ? "#0505066a" : "#fff"}
        borderRadius={2}
        p={isMdDown ? 1 : 3}
        sx={{
          boxShadow: "5px 4px 10px 6px rgba(36, 36, 36, 0.3)",
          boxSizing: "border-box",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          mb={isSmDown ? 0 : 1}
        >
          <Box>
            <Button
              variant="outlined"
              sx={{
                mt: isSmDown ? 1.5 : 4,
                padding: isSmDown ? 0.5 : undefined,
              }}
              onClick={() => navigate("/todoList")}
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
            <IconButton
              aria-label="delete"
              size="medium"
              onClick={() => openModal()}
            >
              <AddCircleIcon
                fontSize="inherit"
                sx={{ color: color, fontSize: isSmDown ? 30 : 60 }}
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
};

export default CalendarContainer;
