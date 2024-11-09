import React, { useState } from "react";
import User from "./src/Component/User";
import Friend from "./src/Component/Friend";
import FriendRequest from "./src/Component/FriendRequest";
import Group from "./src/Component/Group";
import Blocking from "./src/Component/blocking";
import MyGroup from "./src/Component/MyGroup";

export default function HomeNav() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleToggleComponent = (component) => {
    setActiveComponent((prevComponent) =>
      prevComponent === component ? null : component
    );
    console.log("Active Component:", component); // Debugging line
  };

  return (
    <div className="w-full  bg-white bg-opacity-50 rounded-xl mt-40 overflow-hidden">
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
            <div className="text-center">Select a component from above</div>
          )}
        </div>
      </div>
    </div>
  );
}
