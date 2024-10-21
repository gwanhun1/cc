import { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

interface LoginState {
  id: string;
  name: string;
  password: string;
}

const useAuthService = () => {
  const [error, setError] = useState<string | null>(null);

  const join = async (login: LoginState) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        login.id,
        login.password,
      );
      const user = userCredential.user;
      if (login.name) {
        await updateProfile(user, { displayName: login.name });
      }
    } catch (error) {
      const { code, message } = error as FirebaseError;
      console.error("Error during sign-up:", code, message);
      setError("회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const loginUser = async (login: LoginState) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        login.id,
        login.password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
    } catch (error) {
      const { code, message } = error as FirebaseError;
      console.error("Error during login:", code, message);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return { error, join, loginUser };
};

export default useAuthService;
