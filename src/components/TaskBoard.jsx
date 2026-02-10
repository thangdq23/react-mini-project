import React, { useState, useEffect, useCallback } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskColumn } from "./TaskColumn";
import { TaskModal } from "./TaskModal";

export const TaskBoard = () => {
  const { tasks, loadTasks, deleteTask, toggleDone } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  const handleRefresh = async () => {
    const filters = {};
    if (filterStatus !== "all") filters.status = filterStatus;
    if (searchTerm) filters.q = searchTerm;
    await loadTasks(filters);
  };

  const handleEdit = (task) => {
    handleOpenModal(task);
  };

  const handleDelete = async (id) => {
    if (confirm("Xoá công việc này?")) {
      await deleteTask(id);
      handleRefresh();
    }
  };

  const handleToggle = async (id) => {
    await toggleDone(id);
    handleRefresh();
  };

  const handleFilterChange = async (e) => {
    setFilterStatus(e.target.value);
    const filters = {};
    if (e.target.value !== "all") filters.status = e.target.value;
    if (searchTerm) filters.q = searchTerm;
    await loadTasks(filters);
  };

  const handleSearchChange = useCallback(
    async (value) => {
      setSearchTerm(value);
      const filters = {};
      if (filterStatus !== "all") filters.status = filterStatus;
      if (value) filters.q = value;
      await loadTasks(filters);
    },
    [filterStatus],
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const todoCounts = {
    todo: filteredTasks.filter((t) => t.status === "todo").length,
    doing: filteredTasks.filter((t) => t.status === "doing").length,
    done: filteredTasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm kiếm
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm kiếm công việc..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lọc theo trạng thái
              </label>
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="all">Tất cả</option>
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition duration-200 shadow-sm hover:shadow-md"
            >
              + Thêm công việc
            </button>
          </div>
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            status="todo"
            tasks={filteredTasks.filter((t) => t.status === "todo")}
            count={todoCounts.todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
          <TaskColumn
            status="doing"
            tasks={filteredTasks.filter((t) => t.status === "doing")}
            count={todoCounts.doing}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
          <TaskColumn
            status="done"
            tasks={filteredTasks.filter((t) => t.status === "done")}
            count={todoCounts.done}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {showModal && (
        <TaskModal
          onClose={handleCloseModal}
          existingTask={editingTask}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};
