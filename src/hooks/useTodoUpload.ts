import { useState } from "react";
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
  date: string | null;
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

      const offset = new Date().getTimezoneOffset() * 60000;
      const localDate = todoData.date
        ? new Date(todoData.date).toISOString()
        : null;

      const docRef = await addDoc(todosCollectionRef, {
        ...todoData,
        completed: false,
        timestamp: serverTimestamp(),
        date: localDate,
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
