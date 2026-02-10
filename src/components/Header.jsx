import React from "react";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          To-Do List
        </h1>

        {!user ? (
          <div className="flex items-center gap-4">
            <a
              href="/login"
              className="px-6 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              Đăng nhập
            </a>
            <a
              href="/register"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md"
            >
              Đăng ký
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium text-sm">
              Xin chào, {user.email || "Người dùng"}
            </span>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition duration-200 shadow-sm hover:shadow-md"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
