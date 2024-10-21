import { Checkbox, styled } from "@mui/material";

export const TodoCheckbox = styled(Checkbox)({
  color: "#CCCCCC",
  padding: "6px",
  "&.Mui-checked": {
    color: "#E17055",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
