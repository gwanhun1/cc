import { useState } from "react";

interface LoginState {
  id: string;
  name: string;
  password: string;
}

const useLoginForm = (initialMode: "login" | "signUp") => {
  const [mode, setMode] = useState(initialMode);
  const [login, setLogin] = useState<LoginState>({
    id: "",
    name: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModeChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMode((prevMode) => (prevMode === "login" ? "signUp" : "login"));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (mode === "signUp") {
      if (!login.id || !login.password || !login.name) {
        return "빠진 곳이 있어요!";
      }
      if (!emailRegex.test(login.id)) {
        return "아이디를 이메일 형식으로 입력해주세요.";
      }
      if (login.password.length < 6) {
        return "비밀번호는 6자리 이상 입력해주세요.";
      }
      if (login.name.trim().length === 0) {
        return "이름을 입력해주세요.";
      }
    } else if (mode === "login") {
      if (!login.id || !login.password) {
        return "아이디와 비밀번호를 입력해주세요!";
      }
      if (!emailRegex.test(login.id)) {
        return "아이디를 이메일 형식으로 입력해주세요.";
      }
      if (login.password.length < 6) {
        return "비밀번호는 6자리 이상 입력해주세요.";
      }
    }
    return null;
  };

  return {
    mode,
    setMode,
    login,
    handleChange,
    handleModeChange,
    setLogin,
    validateForm,
  };
};

export default useLoginForm;
