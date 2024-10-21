import React from "react";
import { Box, Paper } from "@mui/material";
import { AddButton } from "./AddButton";
import { TodoHeader } from "./TodoHeader";
import { TodoList } from "./TodoList";
import { Todo } from "./TodoListContainer";

interface TodoTemplateProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onEdit: () => void;
}

export const TodoTemplate = ({
  todos,
  onToggleTodo,
  onEdit,
}: TodoTemplateProps) => (
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
    }}
  >
    <TodoHeader count={todos.length} onEdit={onEdit} />
    <TodoList todos={todos} onToggle={onToggleTodo} />
    <AddButton />
  </Paper>
);
