import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/navbar";

const RootLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <div
        className={`flex flex-col min-h-screen w-full bg-cover font-poppins items-center ${
          darkMode ? "bg-[#121212] text-white" : "bg-home-bg text-gray-900 "
        }`}
      >
        <Outlet darkMode={darkMode} setDarkMode={setDarkMode} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </>
  );
};

export default RootLayout;
