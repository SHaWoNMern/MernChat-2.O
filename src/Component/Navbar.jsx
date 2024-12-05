import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, useNavigate } from "react-router-dom";
import SearchButton from "./SearchButton";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const Navbar = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("user", null);
        dispatch(setUser(null));
        navigate("/");
      })
      .catch((error) => {
        console.log('logout error')
      });
  };
  return (
    <nav
      className={`${
        darkMode ? "darkMode" : "lightMode"
      } flex flex-col h-auto absolute left-6 top-1/2 transform -translate-y-1/2 justify-between p-4 items-center font-oxanium rounded-2xl`}
    >
      {/* --------------- Profile Section --------------- */}
      <div className=" mb-6 mt-3">
        <div className="relative">
          <img
            src="dummypp.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
          />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-5">
        {/* ------- Home Icon ---------- */}
        <button className="group navbutton ">
          <Link to="/home" className="flex items-center">
            <i className="fas fa-home navicon"></i>
            <span className="navspan">Home</span>
          </Link>
        </button>

        {/* -------------- Messages Icon ------------- */}
        <button className="group navbutton">
          <Link to="/messages" className="flex items-center">
            <i className="fas fa-comment navicon"></i>
            <span className="navspan">Messages</span>
          </Link>
        </button>

        {/* ---------------Notifications Icon with Tooltip-------------------- */}
        <button className="group navbutton">
          <Link to="/notifications" className="flex items-center">
            <i className="fas fa-bell navicon"></i>
            <span className="navspan">Notifications</span>
          </Link>
        </button>

        {/* ----------------Settings Icon------------- */}
        <button className="group navbutton">
          <Link to="/settings" className="flex items-center">
            <i className="fas fa-cog navicon"></i>
            <span className="navspan">Settings</span>
          </Link>
        </button>

        {/* ------------------search Icon------------- */}
        <button className="group navbutton ">
          <div className="navicon">
            <SearchButton />
          </div>
        </button>

        {/* ----------------Logout-------------- */}
        <button className="group navbutton pb-5">
          <i className="fas fa-sign-out-alt navicon" onClick={handleLogout}></i>
          <span className="navspan">Logout</span>
        </button>
        {/* ------------------Dark Mode Toggle----------------- */}
        <div className="mb-5 flex flex-col items-center justify-center">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div
              className={`w-10 h-5 rounded-full flex items-center justify-${
                darkMode ? "end" : "start"
              } transition-colors ${darkMode ? "bg-gray-900" : "bg-blue-700"}`}
            >
              <div
                className={`w-5 h-5 bg-gray-200 bg-opacity-50 rounded-full shadow transform transition-transform flex items-center justify-center `}
              >
                {darkMode ? (
                  <MdLightMode className="text-gray-900 text-xl" />
                ) : (
                  <MdDarkMode className="text-black text-xl" />
                )}
              </div>
            </div>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
