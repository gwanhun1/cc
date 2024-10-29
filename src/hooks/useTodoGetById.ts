import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { errorState, fetchStatusState } from "../recoil/atoms";
import { TodoItemType } from "./useTodoGet";

export function useTodoGetById(currentMonthKey: string, todoId: string) {
  const [todo, setTodo] = useState<TodoItemType | null>(null);
  const setStatus = useSetRecoilState(fetchStatusState);
  const setError = useSetRecoilState(errorState);
  const db = getFirestore();
  const auth = getAuth();

  const fetchTodoById = async () => {
    setStatus("loading");
    setError(null);
    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }

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
      const docSnapshot = await getDoc(todoRef);

      if (docSnapshot.exists()) {
        setTodo({
          id: Date.now(), // 임시 ID 설정
          ...(docSnapshot.data() as Omit<TodoItemType, "id">),
        });
        setStatus("success");
      } else {
        setStatus("error");
        setError("Todo not found");
      }
    } catch (err) {
      setStatus("error");
      console.error("Error fetching todo by ID:", err);
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchTodoById();
  }, [currentMonthKey, todoId]);

  return { todo };
}
