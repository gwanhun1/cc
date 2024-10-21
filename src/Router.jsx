import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./components/auth/authGuard";
import CalendarContainer from "./features/Calendar/CalendarContainer";
import { TodoListContainer } from "./features/TodoList/TodoListContainer";
import Home from "./pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoList" element={<TodoListContainer />} />
        <Route element={<AuthGuard />}>
          <Route path="/calendar" element={<CalendarContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
