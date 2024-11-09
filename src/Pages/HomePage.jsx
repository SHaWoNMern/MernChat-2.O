import React from "react";
import { useState } from "react";
import Friend from "../Component/Friend";
import FriendRequest from "../Component/FriendRequest";
import Group from "../Component/Group";
import Blocking from "../Component/blocking";
import MyGroup from "../Component/MyGroup";
import User from "../Component/User";


const HomePage = () => {
  // Navbar function---------------------------------------
  const [activeComponent, setActiveComponent] = useState(null);
  const handleToggleComponent = (component) => {
    setActiveComponent((prevComponent) =>
      prevComponent === component ? null : component
    );
  };
  return (
    <div className="flex flex-grow overflow-y-auto">
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
          <div className="absolute inset-x-20 bottom-0 transform translate-y-2/4 w-64 h-64 rounded-full border-4 border-white bg-gray-200">
            <img
              id="profile-photo"
              src="default-profile.png"
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
        <div className="mt-40">
          <div className="w-full bg-white bg-opacity-50 rounded-xl overflow-hidden h-full">
            <div className="flex justify-center h-full">
              <div className="h-12 w-full flex justify-center rounded-sm items-center bg-blue-gray-100 bg-opacity-50">
                <nav className="flex gap-4">
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("userList")}
                      className="homenav"
                    >
                      User List
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("friend")}
                      className="homenav"
                    >
                      Friend
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("friendRequest")}
                      className="homenav"
                    >
                      Friend Request
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("groupList")}
                      className="homenav"
                    >
                      Group List
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("myGroup")}
                      className="homenav"
                    >
                      My Group
                    </button>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleToggleComponent("blockedUser")}
                      className="homenav"
                    >
                      Blocked User
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            <div className="w-full flex justify-start items-start mt-4">
              <div
                className={`w-full transition-opacity duration-500 ease-in-out ${
                  activeComponent ? "opacity-100" : "opacity-0"
                }`}
              >
                {activeComponent === "userList" && <User />}
                {activeComponent === "friend" && <Friend />}
                {activeComponent === "friendRequest" && <FriendRequest />}
                {activeComponent === "groupList" && <Group />}
                {activeComponent === "myGroup" && <MyGroup />}
                {activeComponent === "blockedUser" && <Blocking />}
                {activeComponent === null && (
                  <div className="text-center">
                    Select a component from above
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
