import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // datepicker-styles.css
  "custom-datepicker": {
    border: [
      { unit: "px", value: 1 },
      { unit: "string", value: "solid" },
      { unit: "string", value: "#ccc" },
    ],
    borderRadius: "4px",
    padding: [
      { unit: "px", value: 8 },
      { unit: "px", value: 8 },
      { unit: "px", value: 8 },
      { unit: "px", value: 8 },
    ],
  },
  "custom-datepicker react-datepicker__header": {
    backgroundColor: "COLOR.pink",
    // Set the background color to your pink color
    borderBottom: [
      { unit: "px", value: 1 },
      { unit: "string", value: "solid" },
      { unit: "string", value: "#ccc" },
    ],
  },
  "custom-datepicker react-datepicker__day--selected": {
    backgroundColor: "COLOR.pink",
    // Set the selected day background color
    color: "#fff",
    // Set text color for selected day
  },
  "custom-datepicker react-datepicker__day:hover": {
    backgroundColor: "rgba(255, 105, 180, 0.2)",
    // Light pink hover effect
  },
});
