import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import SearchButton from "./SearchButton";

const Navbar = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);
  return (
    <nav
      className={`${
        darkMode ? "darkMode" : "lightMode"
      } z-10 flex flex-col justify-between p-6 w-24 h-auto absolute left-6 top-1/2 transform -translate-y-1/2 items-center  text-grey-900 font-oxanium rounded-2xl transition-all duration-300 hover:w-36`}
    >
      {/* --------------- Profile Section --------------- */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <img
            src="dummypp.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
          />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="mt-2 text-lg font-bold">MernChat</span>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-10">
        {/* ------- Home Icon ---------- */}
        <button className="group navbutton ">
          <Link to="/home" className="flex items-center">
            <i className="fas fa-home text-4xl hover:animate-rotate"></i>
            <span className="navspan">Home</span>
          </Link>
        </button>

        {/* -------------- Messages Icon ------------- */}
        <button className="group navbutton">
          <Link to="/messages" className="flex items-center">
            <i className="fas fa-comment text-4xl hover:animate-rotate"></i>
            <span className="navspan">Messages</span>
          </Link>
        </button>

        {/* ---------------Notifications Icon with Tooltip-------------------- */}
        <button className="group navbutton">
          <Link to="/notifications" className="flex items-center">
            <i className="fas fa-bell text-4xl hover:animate-rotate"></i>
            <span className="navspan">Notifications</span>
          </Link>
        </button>

        {/* ----------------Settings Icon------------- */}
        <button className="group navbutton">
          <Link to="/settings" className="flex items-center">
            <i className="fas fa-cog text-4xl hover:animate-rotate"></i>
            <span className="navspan">Settings</span>
          </Link>
        </button>

        {/* ------------------search Icon------------- */}
        <button className="group navbutton ">
          <div className="hover:animate-rotate">
            <SearchButton />
          </div>
          <span className="navspan">Search</span>
        </button>

        {/* ------------------Dark Mode Toggle----------------- */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="mb-2 font-bold font-oxanium text-center">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </div>
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div
              className={`w-10 h-5 rounded-full ${
                darkMode ? "bg-gray-900" : "bg-blue-700"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* ----------------Logout-------------- */}
        <button className="group navbutton pb-5">
          <Link to="/" className="flex items-center">
            <i className="fas fa-sign-out-alt text-4xl hover:animate-slideIn"></i>
            <span className="navspan">Logout</span>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
