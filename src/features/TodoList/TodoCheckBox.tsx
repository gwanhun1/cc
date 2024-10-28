import { Checkbox, styled } from "@mui/material";

export const TodoCheckbox = styled(Checkbox)({
  color: "#CCCCCC",
  cursor: "default",
  padding: "6px",
  "&.Mui-checked": {
    color: "#cf364d",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
