import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarContainer from "./features/Calendar/CalendarContainer";
import { TodoListContainer } from "./features/TodoList/TodoListContainer";
import Home from "./pages/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home은 인증 없이 접근 가능 */}
        <Route>
          <Route path="/todoList" element={<TodoListContainer />} />
          <Route path="/calendar" element={<CalendarContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
