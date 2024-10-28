import { useEffect } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorState, fetchStatusState, todosState } from "../recoil/atoms";

export type TodoItemType = {
  id: number; // ID 타입을 숫자로 설정
  text: string | null;
  date: Date | null;
  completed: boolean;
  timestamp: any;
};

export type FetchStatus = "idle" | "loading" | "success" | "error";

function cacheTodos(todos: TodoItemType[]): void {
  // 캐시할 경우 Todo 항목을 처리하는 로직 (필요시 추가)
}

export function useTodoGet(currentMonthKey: string): string[] {
  const [year, month] = currentMonthKey.split("-").map(Number);
  const monthKeys: string[] = [];
  for (let i = 0; i < 2; i++) {
    let targetMonth = month - i;
    let targetYear = year;
    if (targetMonth <= 0) {
      targetMonth += 12;
      targetYear -= 1;
    }
    monthKeys.push(`${targetYear}-${targetMonth.toString().padStart(2, "0")}`);
  }
  return monthKeys;
}

export function useMonthlyTodos(currentMonthKey: string) {
  const [todos, setTodos] = useRecoilState(todosState); // 상태를 todosState로 변경
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
            id: Date.now(), // ID를 현재 시간 밀리초로 설정
            ...(doc.data() as Omit<TodoItemType, "id">),
          });
        });
      }
      cacheTodos(allTodos); // 필요시 캐시 처리
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
