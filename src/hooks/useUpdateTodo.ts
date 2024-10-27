import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useUpdateTodo = () => {
  const updateTodoInFirebase = async (id, updatedData) => {
    try {
      if (typeof id !== "string") {
        throw new Error(`Invalid ID type: ${typeof id}`);
      }

      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedData);
      console.log(`Todo with ID ${id} updated successfully.`);
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  return { updateTodoInFirebase };
};
