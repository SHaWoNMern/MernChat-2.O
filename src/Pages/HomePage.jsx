import React from "react";
import { useState } from "react";
import HomeNav from "../../HomeNav";

const HomePage = () => {
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
        <div className=" flex-grow overflow-y-auto">

        <HomeNav />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
