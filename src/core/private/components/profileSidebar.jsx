import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    { path: "/profile/user-settings", label: "User Settings", icon: "👤" },
    { path: "/profile/upload-book", label: "Publish Papers", icon: "📚" },
  ];

  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 fixed top-16 left-2 bg-white text-black border rounded block md:hidden z-50"
      >
        ☰
      </button>
      <div
        className={`fixed top-16 left-0 h-screen w-64 bg-white border-r shadow-lg transform transition-transform duration-300 z-40
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block`}
      >
        <div className="flex flex-col p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center p-3 mb-2 rounded-lg hover:bg-gray-100 transition-colors
                ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-fondamento">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default ProfileSidebar;
