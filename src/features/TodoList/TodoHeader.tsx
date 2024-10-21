import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { currentDateState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import EditPage from "./EditPage";

interface TodoHeaderProps {
  count: number;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({ count }) => {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
  const [edit, setEdit] = useState(false);
  const dateObject = new Date(currentDate);
  const options = { month: "long" }; // 'long' 형식으로 설정
  const monthName = dateObject.toLocaleString("en-US", options).toUpperCase();

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <>
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
            To Do (<span style={{ color: COLOR.hotpink }}>{count}</span>)
          </Typography>
          <Typography variant="subtitle1" color={COLOR.pink} fontWeight={800}>
            {monthName}
          </Typography>
        </Box>
        <Button
          sx={{
            color: "#999",
            minWidth: "auto",
            textTransform: "none",
            fontSize: "1rem",
          }}
          onClick={handleEdit}
        >
          Edit
        </Button>
      </Box>
      {/* Collapse 컴포넌트를 사용하여 자연스럽게 나타나게 함 */}
      <Collapse in={edit} timeout="auto" unmountOnExit>
        <EditPage />
      </Collapse>
    </>
  );
};
