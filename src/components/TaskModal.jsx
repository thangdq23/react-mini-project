import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";

const escapeHtml = (s) => {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const TaskModal = ({ onClose, existingTask = null, onRefresh }) => {
  const { addTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    priority: existingTask?.priority || "medium",
    status: existingTask?.status || "todo",
    category: existingTask?.category || "",
  });

  const isEdit = !!existingTask;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      category: formData.category.trim() || "Default",
    };

    try {
      if (isEdit) {
        await updateTask(existingTask.id, payload);
      } else {
        await addTask(payload);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-11/12 md:w-1/2 p-8 shadow-2xl border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {isEdit ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Tiêu đề
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Nhập tiêu đề công việc..."
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Mô tả (tùy chọn)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              rows="3"
              placeholder="Nhập mô tả chi tiết..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Mức độ ưu tiên
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Trạng thái
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Danh mục
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Danh mục"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
            >
              Huỷ bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition duration-200 shadow-sm hover:shadow-md"
            >
              Lưu công việc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
