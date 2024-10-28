import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

type UploadStatus = "idle" | "deleting" | "success" | "error";

type UseTodoDeleteResult = {
  deleteTodoItem: any;
  status: UploadStatus;
  error: string | null;
};

export function useTodoDelete(): UseTodoDeleteResult {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const deleteTodoItem = async (criteria: {
    text?: string;
    completed?: boolean;
  }) => {
    console.log("=== Delete Operation Started ===");
    console.log("Criteria for deletion:", criteria);
    setStatus("deleting");
    setError(null);

    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const monthKey = `${year}-${month}`;
      console.log("Using month key:", monthKey);

      // Reference to the todos document
      const todoDocRef = doc(
        db,
        "users",
        "Hjdx9btPk6QCSq0Wnry9d11C1703",
        "months",
        monthKey,
      );

      // Get the current todos
      const todoSnapshot = await getDoc(todoDocRef);
      if (!todoSnapshot.exists()) {
        console.log("Todo document does not exist. Skipping delete.");
        setStatus("success");
        return;
      }

      const todoData = todoSnapshot.data();
      const todosArray = todoData.todo || [];

      // Find the index of the item to delete based on criteria
      const indexToDelete = todosArray.findIndex((item) => {
        return (
          (criteria.text !== undefined && item.text === criteria.text) ||
          (criteria.completed !== undefined &&
            item.completed === criteria.completed)
        );
      });

      // If the item is not found
      if (indexToDelete === -1) {
        console.log(
          "Item to delete does not exist in the todo array. Skipping delete.",
        );
        setStatus("success");
        return;
      }

      // Remove the item from the array
      const updatedTodos = [...todosArray];
      updatedTodos.splice(indexToDelete, 1); // Remove the item

      // Update Firestore with the new todos array
      await updateDoc(todoDocRef, { todo: updatedTodos });
      console.log("Todo item successfully deleted from the array.");
      setStatus("success");
    } catch (err) {
      console.error("Delete operation failed:", err);
      setStatus("error");
      if (err instanceof FirebaseError) {
        setError(err.message);
        console.error("Firebase Error Code:", err.code);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    }
  };

  return { deleteTodoItem, status, error };
}
