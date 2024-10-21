import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoTemplate } from "./TodoTemplate";

const theme = createTheme({
  typography: {
    fontFamily: "'Pretendard', sans-serif",
  },
  palette: {
    primary: {
      main: "#E17055",
    },
  },
});

export const TodoListContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Buy a new yoga mat",
      completed: false,
      dueDate: new Date(),
    },
    {
      id: 2,
      text: "Send a birthday card to Charlie",
      completed: false,
      dueDate: new Date(),
    },
    {
      id: 3,
      text: "Sign up for a new fitness class",
      completed: false,
      dueDate: new Date(Date.now() + 86400000), // tomorrow
    },
    {
      id: 4,
      text: "Read 3 chapters of Atomic Habits",
      completed: false,
      dueDate: new Date(Date.now() + 86400000), // tomorrow
    },
  ]);

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <TodoTemplate todos={todos} onToggleTodo={handleToggleTodo} />
    </Box>
  );
};

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: Date;
}
