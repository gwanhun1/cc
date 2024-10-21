import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import { AuthGuard } from "./components/auth/authGuard.tsx";
import "./style/global.css";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <AuthGuard>
        <App />
      </AuthGuard>
    </ThemeProvider>
  </RecoilRoot>,
);
