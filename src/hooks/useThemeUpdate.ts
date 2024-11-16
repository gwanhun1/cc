import { useState } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type UseUserThemeUploadResult = {
  uploadUserTheme: (newTheme: string) => Promise<void>;
  status: "idle" | "uploading" | "success" | "error";
  error: string | null;
};

export function useUserThemeUpload(): UseUserThemeUploadResult {
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const uploadUserTheme = async (newTheme: string) => {
    setStatus("uploading");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      // 문서가 없다면 새로 생성
      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          theme: newTheme,
        });
      } else {
        // 문서가 있으면 업데이트
        await updateDoc(userDocRef, {
          theme: newTheme,
        });
      }

      setStatus("success");

      // 페이지 새로고침
      window.location.reload();
    } catch (err) {
      setStatus("error");
    }
  };

  return { uploadUserTheme, status, error };
}
