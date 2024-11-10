import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TbSend } from "react-icons/tb";

function messages() {
  const [activeTab, setActiveTab] = useState("chats");

  return (
    <div className="flex h-screen bg-gray-100 w-3/4  rounded-lg">
      {/* ------------------------------ Sidebar Container ------------------------------ */}
      <div className="w-80 bg-white shadow-md flex flex-col">
        {/* --------Tab Navigation----------- */}
        <div className="p-4 border-b flex justify-between">
          <button
            onClick={() => setActiveTab("chats")}
            className={`px-4 py-2 ${
              activeTab === "chats"
                ? "bg-[radial-gradient(circle_80px_at_80%_-10%,_#93A0F9,_#3F57F5)] text-white rounded-full"
                : "text-gray-600"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`px-4 py-2 ${
              activeTab === "groups"
                ? "bg-[radial-gradient(circle_80px_at_80%_-10%,_#93A0F9,_#3F57F5)] text-white rounded-full"
                : "text-gray-600"
            }`}
          >
            Groups
          </button>
        </div>

        {/* ---------------Search Bar------------------ */}
        <div className="p-4 border-b relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <CiSearch className="absolute right-8 text-2xl top-1/2 transform -translate-y-1/2" />
        </div>

        {/* -----------Tab Content---------- */}
        <div className="flex-grow overflow-y-auto p-4">
          {activeTab === "chats" && (
            <ul className="space-y-4">
              <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer rounded-lg">
                <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center">
                  {/* -------------------User.ProfilePicture--------------------- */}
                  <img src="default-profile.png" alt="" />
                </div>
                <div className="ml-3">
                  <h4 className=" font-semibold text-gray-900">
                    {/* ------------------User.name--------------------- */}
                    SHaWoN
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {/* ------------------Last Message--------------------- */}
                    How are you doing?
                  </p>
                </div>
              </li>
            </ul>
          )}
          {activeTab === "groups" && (
            <ul className="space-y-4">
              <li className="flex items-center p-3 hover:bg-gray-200 cursor-pointer rounded-lg">
                <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center ">
                  {/* -------------------Group.ProfilePicture--------------------- */}
                  G1
                </div>
                <div className="ml-3 text-gray-800">Group 1</div>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* -------------------Chat Area----------------------- */}
      <div className="flex-grow flex flex-col">
        <header className="p-[14px] bg-white shadow-md flex items-center">
          <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center">
            {/* ------------------ profile picture ------------------ */}
            <img src="default-profile.png" alt="" />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-gray-900">SHaWoN</h2>
            <p className="text-gray-600 text-sm">Active now</p>
          </div>
        </header>

        {/* ----------------Messages Area------------------------ */}

        {/* --------------- Friend message --------------- */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="p-3 bg-gray-300 rounded-lg inline-block">
                <p>Hey! How's it going?</p>
              </div>
            </div>
            {/* --------------- Friend message --------------- */}

            {/* --------------- My message --------------- */}
            <div className="flex justify-end">
              <div className="p-3 bg-blue-400 rounded-lg inline-block">
                <p>I'm good, thanks! How about you?</p>
              </div>
            </div>
            {/* --------------- My message --------------- */}
          </div>
        </div>

        {/* -------------------------Message Input--------------------- */}
        <footer className="p-4 bg-white border-t">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-full">
              <TbSend className="text-2xl" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default messages;
