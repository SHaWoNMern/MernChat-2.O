import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import User from "../Component/User";

const HomePage = () => {
  const [showUserComponent, setShowUserComponent] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleUserComponent = () => {
    setShowUserComponent(!showUserComponent);
  };

  return (
    <div className="absolute inset-x-48 inset-y-4">
      <div className="relative w-full h-96 bg-gray-200 rounded-xl">
        {/* Cover Photo */}
        <img
          id="cover-photo"
          src="demo-cover.jpeg"
          alt="Cover Photo"
          className="w-full h-full object-cover overflow-hidden rounded-xl"
        />
        <button
          onclick="uploadCoverPhoto()"
          className="absolute top-2 right-2 bg-white p-2 rounded shadow"
        >
          Upload Cover Photo
        </button>
        {/* Profile Photo */}
        <div className="absolute bottom-0 left-20 transform translate-y-2/4 w-64 h-64 rounded-full border-4 border-white bg-gray-200">
          <img
            id="profile-photo"
            src="default-profile.webp"
            alt="Profile Photo"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            onclick="uploadProfilePhoto()"
            className="absolute bottom-4 right-4 bg-white p-1 rounded-full shadow"
          >
            <i className="fa-solid fa-camera text-2xl"></i>
          </button>
        </div>
        {/* Profile Info */}
        <div className="absolute left-[340px] transform translate-y-2/4">
          <div className="flex items-center">
            <div className="ml-2">
              <h2 className="text-3xl font-semibold">Aminul Islam Shawon</h2>
              <p className="text-xl">@SHaWoN</p>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------------------------Nav--------------------------- */}
      <div className="w-full h-2/4 bg-white bg-opacity-50 rounded-xl mt-40 overflow-hidden">
        <div className="flex justify-center h-full">
          <div
            className={`h-12 w-full flex justify-center rounded-sm  items-center ${
              // neeed to change-------------------------
              darkMode
                ? "bg-[#d12d2d] bg-opacity-50 text-white"
                : "bg-blue-gray-100 bg-opacity-50 text-gray-800"
            }`}
          >
            <nav className=" flex gap-4">
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  User List
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  Friend
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  Friend Request
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  Group List
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  My Group
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
              <div className="relative">
                <button onClick={handleToggleUserComponent} className="homenav">
                  Blocked User
                </button>

                <div
                  className={`absolute top-16 left-1/2 -translate-x-1/2 w-[500px] transition-all duration-500 ease-in-out ${
                    showUserComponent
                      ? "opacity-90 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  }`}
                >
                  {showUserComponent && <User />}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
