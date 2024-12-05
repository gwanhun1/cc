import React, { useCallback, useEffect, useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import { useTodoDelete } from "../../hooks/useTodoDelete";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import { DateFormatHandler } from "./DateFormatHandler";
import { TodoCheckbox } from "./TodoCheckBox";

interface TodoItemProps {
  id: string | number;
  text: string|null;
  completed: boolean;
  date?: string | null;
  currentMonthKey: string;
  onToggle: () => void;
}

const getHoverColor = (color: string): string => {
  switch (color) {
    case "#cf364d": return "#d0354e1a";
    case "#28a745": return "#28a74533";
    case "#007bff": return "#007bff33";
    case "#000000": return "#00000033";
    default: return "#6c757d33";
  }
};

export const TodoItem = React.memo<TodoItemProps>(({
  id,
  text,
  completed,
  date,
  currentMonthKey,
  onToggle,
}) => {
  const { deleteTodoItem, status, error } = useTodoDelete();
  const { color } = useUserThemeFetch();

  const handleDelete = useCallback(async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteTodoItem(id, currentMonthKey);
      } catch (err) {
        alert("삭제에 실패했습니다.");
      }
    }
  }, [id, currentMonthKey, deleteTodoItem]);

  useEffect(() => {
    if (status === "success") {
      alert("Todo deleted successfully");
    } else if (status === "error" && error) {
      alert("Deletion failed: " + error);
    }
  }, [status, error]);

  const formattedDate = useMemo(() => 
    date ? DateFormatHandler(date) : null
  , [date]);

  const containerStyles = useMemo(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    width: "100%",
    my: 1,
    py: 1,
    bgcolor: "transparent",
    transition: "background-color 0.2s ease",
    borderRadius: 2,
    "&:hover": {
      bgcolor: getHoverColor(color),
    }
  }), [color]);

  const textStyles = useMemo(() => ({
    color: completed ? "#999" : "#000",
    textDecoration: completed ? "line-through" : "none",
  }), [completed]);

  const dateStyles = {
    color: "#999",
    mt: 0.5,
    fontSize: "0.875rem",
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={{ display: "flex", alignItems: "start" }}>
        <TodoCheckbox checked={completed} onChange={onToggle} />
        <Box sx={{ ml: 1 }}>
          <Typography sx={textStyles}>
            {text}
          </Typography>
          {formattedDate && (
            <Typography variant="body2" sx={dateStyles}>
              {formattedDate}
            </Typography>
          )}
        </Box>
      </Box>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
});
