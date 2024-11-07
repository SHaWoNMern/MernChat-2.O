import React from "react";

const HomePage = () => {
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
      </div>
    </div>
  );
};

export default HomePage;
