import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    borderBottom: [
      { unit: "px", value: 1 },
      { unit: "string", value: "solid" },
      { unit: "string", value: "#ccc" },
    ],
  },
  "custom-datepicker react-datepicker__day--selected": {
    backgroundColor: "COLOR.pink",
    color: "#fff",
  },
  "custom-datepicker react-datepicker__day:hover": {
    backgroundColor: "rgba(255, 105, 180, 0.2)",
  },
});
