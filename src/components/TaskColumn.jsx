import React from "react";
import { TaskCard } from "./TaskCard";

export const TaskColumn = ({
  status,
  tasks,
  count,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const statusLabels = {
    todo: "To Do",
    doing: "Doing",
    done: "Done",
  };

  const statusColors = {
    todo: "bg-blue-50 border-blue-200",
    doing: "bg-amber-50 border-amber-200",
    done: "bg-green-50 border-green-200",
  };

  const badgeColors = {
    todo: "bg-blue-200 text-blue-800",
    doing: "bg-amber-200 text-amber-800",
    done: "bg-green-200 text-green-800",
  };

  return (
    <div
      className={`flex flex-col rounded-lg border-2 p-4 h-full ${statusColors[status]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-800">
          {statusLabels[status]}
        </h2>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColors[status]}`}
        >
          {count}
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">Chưa có công việc</p>
          </div>
        )}
      </div>
    </div>
  );
};
