import { useState } from "react";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

export function useTodoDelete() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const deleteTodoItem = async (todoId: string, currentMonthKey: string) => {
    const db = getFirestore();
    const auth = getAuth();
    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const todoRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "months",
        currentMonthKey,
        "todo",
        todoId,
      );
      await deleteDoc(todoRef);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Failed to delete todo item");
      console.error("Delete error:", err);
    }
  };

  return { deleteTodoItem, status, error };
}
