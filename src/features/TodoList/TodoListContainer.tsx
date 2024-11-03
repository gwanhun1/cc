import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import { AuthGuard } from "../../components/auth/authGuard";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import useIsMobile from "../../hooks/useIsMobile";
import { useMonthlyTodos } from "../../hooks/useTodoGet";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { currentDateState } from "../../recoil/atoms";
import { formatYearMonth } from "../../utils/formatYearMonth";
import { TodoTemplate } from "./TodoTemplate";

export const TodoListContainer = () => {
  const isMobile = useIsMobile();
  const [currentDate] = useRecoilState(currentDateState);
  const { images } = useMonthlyImages(formatYearMonth(currentDate));
  const { todos, setTodos, refetch } = useMonthlyTodos(
    formatYearMonth(currentDate),
  );
  const { updateTodoInFirebase } = useUpdateTodo();
  console.log(todos);

  useEffect(() => {
    const isSameDate = (dueDate, imageDate) => {
      const dueDateObj = new Date(dueDate);
      const imageDateObj = new Date(imageDate);
      return (
        dueDateObj.getUTCFullYear() === imageDateObj.getUTCFullYear() &&
        dueDateObj.getUTCMonth() === imageDateObj.getUTCMonth() &&
        dueDateObj.getUTCDate() === imageDateObj.getUTCDate()
      );
    };

    const updatedTodos = todos.map((todo) => {
      const isCompleted = images.some((image) =>
        isSameDate(todo.date, image.date),
      );
      if (todo.completed !== isCompleted) {
        // Firebase 업데이트 호출
        updateTodoInFirebase(todo.id, { completed: isCompleted });
      }
      return { ...todo, completed: isCompleted };
    });

    const sortedTodos = updatedTodos.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateA - dateB;
    });

    if (JSON.stringify(sortedTodos) !== JSON.stringify(todos)) {
      setTodos(sortedTodos);
    }
  }, [images, updateTodoInFirebase, todos, setTodos]);

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <AuthGuard>
      <Box sx={{ minHeight: "100vh" }}>
        <TodoTemplate
          todos={todos}
          onToggleTodo={handleToggleTodo}
          refetch={refetch}
        />
      </Box>
    </AuthGuard>
  );
};
