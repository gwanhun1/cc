import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./style/global.css";

createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
