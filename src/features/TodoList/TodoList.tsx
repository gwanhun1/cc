import React from "react";
import { Box } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { Todo } from "./TodoListContainer";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => (
  <Box>
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        dueDate={todo.dueDate}
        onToggle={() => onToggle(todo.id)}
      />
    ))}
  </Box>
);
