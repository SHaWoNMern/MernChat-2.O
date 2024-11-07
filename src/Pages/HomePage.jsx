import React from "react";

const HomePage = () => {
  return (
    <div className="absolute inset-x-32 inset-y-4">
      <div className="relative w-full h-96 bg-gray-200 rounded-xl">
        {/* Cover Photo */}
        <img
          id="cover-photo"
          src="default-cover.jpg"
          alt="Cover Photo"
          className="w-full h-full object-cover"
        />
        <button
          onclick="uploadCoverPhoto()"
          className="absolute top-2 right-2 bg-white p-2 rounded shadow"
        >
          Upload Cover Photo
        </button>
        {/* Profile Photo */}
        <div className="absolute bottom-0 right-10 transform translate-y-1/2 w-48 h-48 rounded-full border-4 border-white bg-gray-200">
          <img
            id="profile-photo"
            src="default-profile.jpg"
            alt="Profile Photo"
            className="w-full h-full rounded-full object-cover"
          />
          <button
            onclick="uploadProfilePhoto()"
            className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
