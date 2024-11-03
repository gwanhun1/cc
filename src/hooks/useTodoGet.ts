import { useEffect } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorState, fetchStatusState, todosState } from "../recoil/atoms";

export type TodoItemType = {
  id: string | number;
  text: string | null;
  date: Date | null;
  completed: boolean;
  timestamp: any;
};

export type FetchStatus = "idle" | "loading" | "success" | "error";

export function useTodoGet(currentMonthKey: string): string[] {
  return [currentMonthKey];
}

export function useMonthlyTodos(currentMonthKey: string) {
  const [todos, setTodos] = useRecoilState(todosState);
  const setStatus = useSetRecoilState(fetchStatusState);
  const setError = useSetRecoilState(errorState);
  const db = getFirestore();
  const auth = getAuth();

  const fetchTodos = async () => {
    setStatus("loading");
    setError(null);
    if (!auth.currentUser) {
      setStatus("error");
      setError("User not authenticated");
      return;
    }
    try {
      const monthKeys = useTodoGet(currentMonthKey);
      const allTodos: TodoItemType[] = [];

      for (const monthKey of monthKeys) {
        const userRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "months",
          monthKey,
          "todo",
        );
        const q = query(userRef);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          allTodos.push({
            id: doc.id,
            ...(doc.data() as Omit<TodoItemType, "id">),
          });
        });
      }
      setTodos(allTodos);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.error("Error fetching todos:", err);
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchTodos();
      } else {
        setStatus("error");
        setError("User not authenticated");
      }
    });
    return () => unsubscribe();
  }, [auth, currentMonthKey]);

  const refetch = () => {
    return fetchTodos();
  };

  return { todos, refetch, setTodos };
}
