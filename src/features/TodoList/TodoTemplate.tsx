import React from "react";
import { Box, Paper } from "@mui/material";
import { AddButton } from "./AddButton";
import { TodoHeader } from "./TodoHeader";
import { TodoList } from "./TodoList";
import { Todo } from "./TodoListContainer";

interface TodoTemplateProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
}

export const TodoTemplate = ({ todos, onToggleTodo }: TodoTemplateProps) => (
  <Paper
    elevation={0}
    sx={{
      maxWidth: 500,
      mx: "auto",
      position: "relative",
      minHeight: "80vh",
      bgcolor: "#f5f5f5",
      borderRadius: 4,
      p: 3,
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f0f0f0",
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
        transform: "translateY(-4px)",
      },
    }}
  >
    <TodoHeader count={todos.length} />
    <TodoList todos={todos} onToggle={onToggleTodo} />
    <AddButton />
  </Paper>
);
