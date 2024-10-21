import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface TodoHeaderProps {
  count: number;
  onEdit: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ count, onEdit }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 3,
      mt: 2,
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        To Do
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#666" }}>
        Weekly To Do {count}
      </Typography>
    </Box>
    <Button
      sx={{
        color: "#999",
        minWidth: "auto",
        textTransform: "none",
        fontSize: "1rem",
      }}
      onClick={onEdit}
    >
      Edit
    </Button>
  </Box>
);
