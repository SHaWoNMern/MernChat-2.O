import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaKey } from "react-icons/fa6";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { RiImageEditFill } from "react-icons/ri";
import { BiSolidHelpCircle } from "react-icons/bi";
import { TbPasswordUser } from "react-icons/tb";
import { CgDarkMode } from "react-icons/cg";

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
        <CiSearch className="absolute right-8 text-2xl top-1/2 transform -translate-y-1/2 text-gray-900" />
      </div>
      {/* ---------------- Search Bar ---------------- */}

      {/* ---------------- Profile Settings ---------------- */}
      <div className="flex justify-between w-full gap-4 p-4">
        <div className="w-1/2 rounded-lg shadow-md border-blue-gray-50 border-2">
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
                  <h3 className="text-lg font-semibold">Aminul Islam Shawon</h3>
                  <p className="">Email : admin@mernchat.com</p>
                </div>
              </div>
              <hr className="border-t border-gray-500"></hr>
            </div>
          </div>
          <ul className="space-y-6 pl-8 mb-8">
            <li className="flex">
              <div className="settinghover">
                <MdEditSquare className="text-2xl" />
                <span>Edit Profile Name</span>
              </div>
            </li>
            <li className=" flex">
              <div className="settinghover">
                <FaAddressCard className="text-2xl" />
                <span>Edit Profile Status Info.</span>
              </div>
            </li>
            <li className="flex">
              <div className="settinghover">
                <RiImageEditFill className="text-2xl" />
                <p>Edit Profile Photo.</p>
              </div>
            </li>
            <li className="flex">
              <div className="settinghover">
                <BiSolidHelpCircle className="text-2xl" />
                <p>Help.</p>
              </div>
            </li>
          </ul>
        </div>
        {/* ---------------- Profile Settings ---------------- */}

        {/* ---------------- Account Settings ---------------- */}
        <div className="w-1/2 rounded-lg shadow-md border-blue-gray-50 border-2">
          <div className="p-10">
            <h2 className="text-2xl font-bold mb-4">Account Setting</h2>
            <div className="space-y-4">
              <div className="flex items-center ml-4"></div>
            </div>
          </div>
          <ul className="space-y-6 pl-7">
            <li className="flex">
              <div className="settinghover">
                <FaKey className="text-2xl" />
                <p>Change Password</p>
              </div>
            </li>
            <li className="flex">
              <div className="settinghover">
                <TbPasswordUser className="text-2xl" />
                <p>Change Username</p>
              </div>
            </li>
            <li className="flex">
              <div className="settinghover">
                <CgDarkMode className="text-2xl" />
                <p>Dark Mode</p>
              </div>
            </li>
            <li className="flex">
              <div className="settinghover">
                <MdDelete className="text-2xl" />
                <p>Delete Account</p>
              </div>
            </li>
          </ul>
        </div>
        {/* ---------------- Account Settings ---------------- */}
      </div>
    </div>
  );
};

export default Setting;
