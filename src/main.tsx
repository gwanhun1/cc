import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/global.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.ts";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
