import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../App";

const ProfileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { darkMode } = useTheme();
  const menuItems = [
    { path: "/profile/user-settings", label: "User Settings", icon: "👤" },
    { path: "/profile/upload-book", label: "Publish Papers", icon: "📚" },
  ];

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`p-2 fixed top-16 left-2 border rounded block md:hidden z-50 transition-colors
          ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
      >
        ☰
      </button>
      <div
        className={`fixed top-16 left-0 h-screen w-64 border-r shadow-lg transform transition-transform duration-300 z-40
          ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block`}
      >
        <div className="flex flex-col p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center p-3 mb-2 rounded-lg transition-colors
                ${
                  location.pathname === item.path
                    ? darkMode
                      ? "bg-gray-800 text-yellow-400"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-fondamento">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
