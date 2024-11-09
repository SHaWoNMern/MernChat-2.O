import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaKey } from "react-icons/fa6";

const Setting = () => {
  return (
    <div className="flex flex-col h-screen w-3/4 rounded-lg mt-20">
      {/* ---------------- Search Bar ---------------- */}
      <div className="p-4 border-b relative shadow-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <CiSearch className="absolute right-8 text-2xl top-1/2 transform -translate-y-1/2" />
      </div>
      {/* ---------------- Search Bar ---------------- */}

      {/* ---------------- Profile Settings ---------------- */}
      <div className="flex justify-between w-full gap-4 p-4">
        <div className="w-1/2 rounded-lg shadow-md h-96 border-blue-gray-50 border-2">
          <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src="dummypp.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="">Email: 0NfB0@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 rounded-lg shadow-md h-96 border-blue-gray-50 border-2">
          <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Account Setting</h2>
            <div className="space-y-4">
              <div className="flex items-center ml-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
