import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import { useTodoDelete } from "../../hooks/useTodoDelete";
import { COLOR } from "../../style/constants";
import { DateFormatHandler } from "./DateFormatHandler";
import { TodoCheckbox } from "./TodoCheckBox";

interface TodoItemProps {
  id: any;
  text: string | null;
  completed: boolean;
  date?: string;
  currentMonthKey: any;
  onToggle: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  date,
  currentMonthKey,
  onToggle,
}) => {
  const [hover, setHover] = useState(false);
  const { deleteTodoItem, status, error } = useTodoDelete();

  useEffect(() => {
    if (status === "success") {
      alert("Todo deleted successfully");
    } else if (status === "error" && error) {
      alert("Deletion failed: " + error);
    }
  }, [status, error]);

  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteTodoItem(id, currentMonthKey);
        console.log("Todo successfully deleted");
        alert("문제가 발생했습니다.🥲");
      } catch (err) {}
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        width: "100%",
        my: 1,
        py: 1,
        bgcolor: hover ? COLOR.lightPink : "transparent",
        transition: "background-color 0.2s ease",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "start" }}>
        <TodoCheckbox checked={completed} onChange={onToggle} />
        <Box sx={{ ml: 1 }}>
          <Typography
            sx={{
              color: completed ? "#999" : "#000",
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {text}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              mt: 0.5,
              fontSize: "0.875rem",
            }}
          >
            {date && DateFormatHandler(date)}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
