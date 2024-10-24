import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import { AuthGuard } from "../../components/auth/authGuard";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import useIsMobile from "../../hooks/useIsMobile";
import { currentDateState } from "../../recoil/atoms";
import { formatYearMonth } from "../../utils/formatYearMonth";
import { TodoTemplate } from "./TodoTemplate";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate: Date;
}

export const TodoListContainer = () => {
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const { images, refetch } = useMonthlyImages(formatYearMonth(currentDate));

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
      dueDate: new Date(Date.now() + 86400000),
    },
    {
      id: 4,
      text: "Read 3 chapters of Atomic Habits",
      completed: false,
      dueDate: new Date(Date.now() + 86400000),
    },
    {
      id: 5,
      text: "Prepare for the presentation on project X",
      completed: false,
      dueDate: new Date("2024-10-12T00:00:00"),
    },
    {
      id: 6,
      text: "Grocery shopping for the week",
      completed: false,
      dueDate: new Date("2024-10-15T00:00:00"),
    },
  ]);

  useEffect(() => {
    const areSameDay = (first: Date, second: Date) => {
      return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
      );
    };

    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        completed:
          images.some((image) =>
            areSameDay(new Date(image.date), todo.dueDate),
          ) || todo.completed,
      })),
    );
  }, [images]);

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <AuthGuard>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <TodoTemplate todos={todos} onToggleTodo={handleToggleTodo} />
      </Box>
    </AuthGuard>
  );
};
