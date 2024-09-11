import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

type DeleteImageData = {
  imageUrl: string; // 이미지의 Firebase Storage URL
  date: string; // "YYYY-MM-DD" 형식의 날짜
  imageId: string; // Firestore에 저장된 이미지 문서의 ID
};

type DeleteStatus = "idle" | "deleting" | "success" | "error";

type UseImageDeleteResult = {
  deleteImage: (deleteData: DeleteImageData) => Promise<void>;
  status: DeleteStatus;
  error: string | null;
};

export function useImageDelete(): UseImageDeleteResult {
  const [status, setStatus] = useState<DeleteStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  const deleteImage = async (deleteData: DeleteImageData) => {
    setStatus("deleting");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    const { imageUrl, date, imageId } = deleteData;

    try {
      // Storage에서 이미지 파일 삭제
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);

      // Firestore에서 이미지 문서 삭제
      const dateObj = new Date(date);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const monthKey = `${year}-${month}`;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const monthRef = doc(userRef, "months", monthKey);
      const imageDocRef = doc(monthRef, "images", imageId);

      await deleteDoc(imageDocRef);

      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { deleteImage, status, error };
}
