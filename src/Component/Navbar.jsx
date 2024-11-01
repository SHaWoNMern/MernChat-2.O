import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className="flex items-center min-h-screen pl-3">
        <nav className="bg-gray-800 text-white flex flex-col justify-between p-4 w-auto h-auto items-center rounded-2xl transition-all duration-300 hover:w-40">
          {" "}
          {/* Navbar expands on hover */}
          <div className="flex flex-col items-center pb-20">
            <div className="relative">
              <img
                src="dummypp.png"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <span className="ml-2 text-lg">MernChat</span>
          </div>
          <div className="flex flex-col text-4xl gap-10">
            {/* Home Icon with Tooltip */}
            <div className="relative group">
              <Link to="/" className="hover:text-gray-400">
                <i className="fas fa-home"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Home
              </span>
            </div>
            {/* Messages Icon with Tooltip */}
            <div className="relative group">
              <Link to="/messages" className="hover:text-gray-400">
                <i className="fas fa-comment"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Messages
              </span>
            </div>
            {/* Notifications Icon with Tooltip */}
            <div className="relative group">
              <Link to="/notifications" className="hover:text-gray-400">
                <i className="fas fa-bell"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Notifications
              </span>
            </div>
            {/* Settings Icon with Tooltip */}
            <div className="relative group">
              <Link to="/settings" className="hover:text-gray-400">
                <i className="fas fa-cog"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Settings
              </span>
            </div>
            {/* Slack Icon with Tooltip */}
            <div className="relative group">
              <Link className="hover:text-gray-400 pb-10">
                <i className="fa-brands fa-slack"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Slack
              </span>
            </div>
            {/* Logout Icon with Tooltip */}
            <div className="relative group">
              <Link to="/logout" className="hover:text-gray-400 pb-10">
                <i className="fas fa-sign-out-alt"></i>
              </Link>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Logout
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
