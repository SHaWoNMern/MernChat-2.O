import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <div
        className={`flex min-h-screen bg-cover w-full ${
          darkMode ? "bg-dark-image text-white" : "bg-light-image text-gray-900"
        }`}
      >
        <Outlet />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </>
  );
};

export default RootLayout;
