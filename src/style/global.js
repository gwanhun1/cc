import { StyleSheet } from "react-native";

export default StyleSheet.create({
  ":root": {
    Color: "#cf364d",
    BackgroundColor: "#ffffff",
    LinkColor: "#cf364d",
    LinkHoverColor: "#747bff",
    TodayBgColor: "#ffe8f2",
    DayHeaderBgColor: "#d0354e1a",
  },
  "*": {
    boxSizing: "border-box",
  },
  html: {
    margin: [
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
    ],
    padding: [
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
    ],
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: [{ unit: "px", value: 1.5 }],
    fontWeight: "400",
    colorScheme: "light dark",
    color: "var(--color)",
    backgroundColor: "var(--background-color)",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "prefers-color-scheme ligh": {
      backgroundColor: "var(--background-color)",
      color: "var(--color)",
    },
    "prefers-color-scheme dar": {
      backgroundColor: "var(--background-color)",
      color: "var(--color)",
    },
  },
  body: {
    margin: [
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
    ],
    padding: [
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
      { unit: "px", value: 0 },
    ],
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: [{ unit: "px", value: 1.5 }],
    fontWeight: "400",
    colorScheme: "light dark",
    color: "var(--color)",
    backgroundColor: "var(--background-color)",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    "prefers-color-scheme ligh": {
      backgroundColor: "var(--background-color)",
      color: "var(--color)",
    },
    "prefers-color-scheme dar": {
      backgroundColor: "var(--background-color)",
      color: "var(--color)",
    },
  },
  a: {
    fontWeight: "500",
    textDecoration: "inherit",
  },
  "a:hover": {
    color: "var(--link-hover-color)",
  },
  h1: {
    fontSize: [{ unit: "em", value: 3.2 }],
    lineHeight: [{ unit: "px", value: 1.1 }],
  },
  body: {
    minWidth: [{ unit: "px", value: 320 }],
    backgroundColor: "var(--background-color)",
  },
  "theme-light": {
    Color: "#213547",
    BackgroundColor: "#ffffff",
    LinkColor: "#cf364d",
    LinkHoverColor: "#747bff",
    TodayBgColor: "#ffe8f2",
    DayHeaderBgColor: "#d0354e1a",
  },
  "theme-dark": {
    Color: "#efefef",
    BackgroundColor: "#333333",
    LinkColor: "#cf364d",
    LinkHoverColor: "#747bff",
    TodayBgColor: "#ffe8f2",
    DayHeaderBgColor: "#d0354e1a",
  },
  "theme-red": {
    Color: "#cf364d",
    BackgroundColor: "#ffffff",
  },
  "theme-green": {
    Color: "#28a745",
    BackgroundColor: "#ffffff",
  },
  "theme-blue": {
    Color: "#007bff",
    BackgroundColor: "#ffffff",
  },
  "theme-black": {
    Color: "#ffffff",
    BackgroundColor: "#333333",
  },
});
