import React from "react";
import { Box } from "@mui/material";
import { TodoItemType } from "../../hooks/useTodoGet";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: TodoItemType[];
  onToggle: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <Box>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          date={todo.date}
          onToggle={() => onToggle(todo.id)}
        />
      ))}
    </Box>
  );
};
