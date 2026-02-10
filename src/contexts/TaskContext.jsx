import React, { createContext, useState, useCallback, useEffect } from "react";
import { tasksAPI } from "../services/api";
import { storageAPI } from "../services/storage";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortTasks = useCallback((arr) => {
    return arr.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }, []);

  const loadTasks = useCallback(
    async (filters = {}) => {
      setLoading(true);
      setError(null);
      try {
        const user = storageAPI.getCurrentUser();
        if (user && user.accessToken) {
          try {
            const result = await tasksAPI.loadTasks(filters);
            const normalized = result.map((d) => storageAPI._normalize(d));
            storageAPI.saveTasks(normalized);
            setTasks(sortTasks(normalized));
            return;
          } catch (e) {
            console.log("API error, loading from local");
          }
        }
        const local = storageAPI.getTasks();
        setTasks(sortTasks(local));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [sortTasks],
  );

  const addTask = useCallback(
    async (data) => {
      try {
        const user = storageAPI.getCurrentUser();
        const payload = {
          title: data.title || "Untitled",
          description: data.description || "",
          status: data.status || "todo",
          priority: data.priority || "medium",
          category: data.category || "Default",
          userId: user?.user?._id || user?.id || user?.email,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        let created = payload;
        if (user && user.accessToken) {
          try {
            created = await tasksAPI.createTask(payload);
            created = storageAPI._normalize(created);
          } catch (e) {
            console.log("API error, using local");
            created = {
              ...payload,
              id:
                Date.now().toString(36) +
                Math.random().toString(36).slice(2, 8),
            };
          }
        } else {
          created = {
            ...payload,
            id:
              Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
          };
        }

        setTasks((prev) => sortTasks([created, ...prev]));
        storageAPI.saveTasks([created, ...storageAPI.getTasks()]);
        return created;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [sortTasks],
  );

  const updateTask = useCallback(
    async (id, updates) => {
      try {
        const user = storageAPI.getCurrentUser();
        let updated = null;

        if (user && user.accessToken) {
          try {
            updated = await tasksAPI.updateTask(id, updates);
            updated = storageAPI._normalize(updated);
          } catch (e) {
            console.log("API error, using local");
            const existing = tasks.find((t) => t.id === id);
            updated = { ...existing, ...updates, updatedAt: Date.now() };
          }
        } else {
          const existing = tasks.find((t) => t.id === id);
          updated = { ...existing, ...updates, updatedAt: Date.now() };
        }

        setTasks((prev) => {
          const newTasks = prev.map((t) => (t.id === id ? updated : t));
          storageAPI.saveTasks(newTasks);
          return sortTasks(newTasks);
        });
        return updated;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [tasks, sortTasks],
  );

  const deleteTask = useCallback(async (id) => {
    try {
      const user = storageAPI.getCurrentUser();
      if (user && user.accessToken) {
        try {
          await tasksAPI.deleteTask(id);
        } catch (e) {
          console.log("API error, using local");
        }
      }

      setTasks((prev) => {
        const newTasks = prev.filter((t) => t.id !== id);
        storageAPI.saveTasks(newTasks);
        return newTasks;
      });
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const toggleDone = useCallback(
    async (id) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return null;
      const newStatus = task.status === "done" ? "todo" : "done";
      return updateTask(id, { status: newStatus });
    },
    [tasks, updateTask],
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        loadTasks,
        addTask,
        updateTask,
        deleteTask,
        toggleDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
