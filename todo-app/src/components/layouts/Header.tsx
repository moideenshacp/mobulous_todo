import { getCurrentDate } from "@/utils/curentDate";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Popconfirm, message } from "antd"; 

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const confirmLogout = () => {
    logout();
    message.success("You have been signed out.");
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo and title */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="ml-2 text-xl font-bold text-gray-900">
              Task Manager
            </h1>
          </div>

          {/* Right: Date, User Info, Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{getCurrentDate()}</span>
            {user && (
              <>
                <span className="text-sm text-gray-700">
                  Hello, {user.name || user.email}
                </span>

                <Popconfirm
                  title="Are you sure you want to sign out?"
                  onConfirm={confirmLogout}
                  okText="Yes"
                  cancelText="No"
                >
                  <button
                    className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </Popconfirm>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
