import React from "react";
import { useTasks } from "../hooks/useTasks";

const escapeHtml = (s) => {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const PriorityBadge = ({ priority }) => {
  if (priority === "high") {
    return (
      <span className="text-xs bg-gradient-to-r from-red-100 to-red-50 text-red-700 px-3 py-1.5 rounded-full font-medium">
        High
      </span>
    );
  }
  if (priority === "medium") {
    return (
      <span className="text-xs bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
        Medium
      </span>
    );
  }
  return (
    <span className="text-xs bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium">
      Low
    </span>
  );
};

export const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const borderColor =
    task.priority === "high"
      ? "border-l-red-500"
      : task.priority === "medium"
        ? "border-l-amber-500"
        : "border-l-green-500";

  return (
    <div
      className={`bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl border border-gray-200 ${borderColor} border-l-4 shadow-sm hover:shadow-md transition duration-200`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {escapeHtml(task.title)}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-2">
              {escapeHtml(task.description)}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2 font-medium">
            📂 {escapeHtml(task.category || "Default")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <PriorityBadge priority={task.priority} />
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => onToggle(task.id)}
              className="text-green-600 hover:text-green-700 font-medium hover:underline transition"
            >
              {task.status === "done" ? "↩ Bỏ" : "✓ Hoàn thành"}
            </button>
            <button
              onClick={() => onEdit(task)}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-700 font-medium hover:underline transition"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
