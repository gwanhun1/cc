import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { COLOR } from "../../style/constants";

const LoginPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        // mb={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bgcolor="red" height={130} width={130} />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign="center" color={COLOR.hotpink}>
          CC에서는 커플의 사진을 멋진 캘린더로 만들어 드립니다.
          <br />
          매달 사랑하는 사람과의 추억을 새로운 디자인으로 만끽하세요.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="아이디"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="비밀번호"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
