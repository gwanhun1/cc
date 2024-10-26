import { useState } from "react";
import { Dayjs } from "dayjs";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

type TodoItemInput = {
  text: string | null;
  dueDate: Date | null;
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

type UseTodoUploadResult = {
  uploadTodoItem: (todoData: TodoItemInput) => Promise<void>;
  status: UploadStatus;
  error: string | null;
};

export function useTodoUpload(): UseTodoUploadResult {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const uploadTodoItem = async (todoData: TodoItemInput) => {
    setStatus("uploading");
    setError(null);

    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    try {
      const date = new Date();
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const monthKey = `${year}-${month}`;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const monthRef = doc(userRef, "months", monthKey);
      const todosCollectionRef = collection(monthRef, "todo");

      await addDoc(todosCollectionRef, {
        ...todoData,
        completed: false, // 기본값으로 false 설정
        timestamp: serverTimestamp(),
      });

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

  return { uploadTodoItem, status, error };
}
