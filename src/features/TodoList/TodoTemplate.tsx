import React from "react";
import { Paper } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { TodoItemType } from "../../hooks/useTodoGet";
import { TodoHeader } from "./TodoHeader";
import { TodoList } from "./TodoList";

interface TodoTemplateProps {
  todos: TodoItemType[];
  onToggleTodo: (id: number) => void;
  refetch: any;
}

export const TodoTemplate = ({
  todos,
  onToggleTodo,
  refetch,
}: TodoTemplateProps) => {
  const isMobile = useIsMobile();

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 500,
        mx: "auto",
        position: "relative",
        minHeight: "80vh",
        bgcolor: "#f5f5f5",
        borderRadius: 4,
        p: isMobile ? 1 : 3,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#f8f8f8",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <TodoHeader count={todos.length} refetch={refetch} />
      <TodoList todos={todos} onToggle={onToggleTodo} />
    </Paper>
  );
};
