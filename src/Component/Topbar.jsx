import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchButton from "./SearchButton";

const Topbar = () => {
  return (
    <div className="flex justify-between gap-4 text-4xl mt-4 mx-auto text-blue-gray-700">
      <button className="flex">
        <i className="fa-solid fa-user"></i>
      </button>
      <button className="flex">
        <i class="fa-solid fa-user-group"></i>
      </button>
      <button className="flex">
        <i class="fa-solid fa-users-line"></i>
      </button>
      <button className="flex">
          <SearchButton />
      </button>
    </div>
  );
};

export default Topbar;
