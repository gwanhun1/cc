import { useState } from "react";

type Mode = "login" | "signUp" | "forgotPassword";

const useLogin = (initialMode: Mode = "login") => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [error, setError] = useState<boolean>(false);

  const handleModeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    setMode(name as Mode);
  };

  const toggleError = () => {
    setError((prev) => !prev);
  };

  return {
    mode,
    error,
    handleModeChange,
    toggleError,
  };
};

export default useLogin;
