import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks phải được sử dụng trong TaskProvider");
  }
  return context;
};
