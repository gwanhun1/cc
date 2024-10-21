import React from "react";
import { Box, Typography } from "@mui/material";
import { DateFormatHandler } from "./DateFormatHandler";
import { TodoCheckbox } from "./TodoCheckBox";

interface TodoItemProps {
  text: string;
  completed: boolean;
  dueDate: Date;
  onToggle: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  dueDate,
  onToggle,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "start",
      py: 1.5,
    }}
  >
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
        {DateFormatHandler(dueDate)}
      </Typography>
    </Box>
  </Box>
);
