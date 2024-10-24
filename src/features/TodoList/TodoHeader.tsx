import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Button, Collapse, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { currentDateState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import { AddButton } from "./AddButton";
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
  const isMobile = useIsMobile();

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
          mb: isMobile ? 0 : 3,
          mt: isMobile ? 4 : 2,
        }}
      >
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{ fontWeight: "bold" }}
        >
          To Do (<span style={{ color: COLOR.hotpink }}>{count}</span>)
        </Typography>
        <Typography
          variant={isMobile ? "subtitle1" : "h5"}
          color={COLOR.pink}
          fontWeight={800}
          p={1}
          sx={{ textDecoration: "underline" }}
        >
          {monthName}
        </Typography>
      </Box>
      <Collapse in={edit} timeout="auto" unmountOnExit>
        <EditPage setEdit={setEdit} />
      </Collapse>
      <AddButton setEdit={setEdit} />
    </>
  );
};
