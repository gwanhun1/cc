import React from "react";
import { getAuth } from "firebase/auth";
import { useRecoilState } from "recoil";
import { Button, Grid, TextField, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import useAuthService from "../../hooks/useAuthService";
import { useMonthlyImages } from "../../hooks/useImagesGet";
import useLoginForm from "../../hooks/useLoginForm";
import { useUserThemeFetch } from "../../hooks/useUserThemeFetch";
import { currentDateState } from "../../recoil/atoms";
import { COLOR } from "../../style/constants";
import { formatYearMonth } from "../../utils/formatYearMonth";

interface LoginPageProps {
  closeModal: () => void;
}

const LoginPage = ({ closeModal }: LoginPageProps) => {
  const {
    mode,
    setMode,
    login,
    handleChange,
    handleModeChange,
    setLogin,
    validateForm,
  } = useLoginForm("login");
  const { error, join, loginUser } = useAuthService();
  const [currentDate] = useRecoilState(currentDateState);

  const { refetch } = useMonthlyImages(formatYearMonth(currentDate));

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    if (mode === "signUp") {
      await join(login);
      setMode("login");
      alert("🎉 환영합니다 🎉");
    } else if (mode === "login") {
      try {
        await loginUser(login);
        const auth = getAuth();
        if (auth.currentUser) {
          await refetch();
          closeModal();
        } else {
          alert("회원정보를 다시 확인해주세요.");
        }
      } catch (error: any) {
        if (error.code === "auth/too-many-requests") {
          alert("잠시 후 다시 시도해 주세요.");
        } else if (
          error.code === "auth/invalid-password" ||
          error.code === "auth/user-not-found"
        ) {
          alert("회원정보를 다시 확인해주세요.");
        } else if (error.response && error.response.status === 400) {
          alert("잠시 후 다시 시도해 주세요.");
        } else {
          alert("회원정보를 다시 확인해주세요.");
        }
      }
    }
  };

  const { color } = useUserThemeFetch();

  return (
    <Grid container rowSpacing={2}>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        my={5}
      >
        <img src={logo} loading="lazy" style={{ width: 80 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign="center" color={COLOR.gray}>
          <span style={{ color: color, fontWeight: "bold", fontSize: 20 }}>
            CC{" "}
          </span>
          에서는 커플의{" "}
          <span style={{ color: color, fontWeight: "bold" }}>사진</span>을{" "}
          <br />
          멋진 <span style={{ color: color }}>캘린더</span>
          로 만들어 드립니다.
          <br />
          매달{" "}
          <span style={{ color: color, fontWeight: "bold" }}>
            사랑하는 사람
          </span>
          과의
          <span style={{ color: color, fontWeight: "bold" }}>
            <br />
            추억
          </span>
          을 새로운 디자인으로 만끽하세요.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="아이디"
          variant="outlined"
          size="small"
          fullWidth
          name="id"
          value={login.id}
          onChange={handleChange}
        />
      </Grid>
      {mode === "signUp" && (
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="이름"
            variant="outlined"
            size="small"
            fullWidth
            name="name"
            value={login.name}
            onChange={handleChange}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label="비밀번호"
          variant="outlined"
          size="small"
          fullWidth
          name="password"
          type={mode === "login" ? "password" : undefined}
          value={login.password}
          onChange={handleChange}
        />
      </Grid>
      {error && (
        <Grid item xs={12} textAlign="center">
          <Typography variant="subtitle2" color={COLOR.blue}>
            {mode === "login"
              ? "아이디 및 비밀번호를 확인해주세요."
              : "아이디,이름 및 비밀번호 양식을 맞춰주세요."}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          {mode === "login" ? "로그인" : "회원가입"}
        </Button>
      </Grid>
      {mode === "login" && (
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            name="signUp"
            onClick={handleModeChange}
          >
            회원가입 하러가기
          </Button>
        </Grid>
      )}
      {mode !== "login" && (
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            name="login"
            onClick={handleModeChange}
          >
            로그인 하러가기
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default LoginPage;
