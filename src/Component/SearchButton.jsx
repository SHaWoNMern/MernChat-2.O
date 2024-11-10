import { useState } from "react";

const SearchButton = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);

  const toggleSearchBox = () => setShowSearchBox((prev) => !prev);

  return (
    <div className="relative flex items-center">
      {/* Search Icon Button */}
      <button onClick={toggleSearchBox} className="flex">
        <i className="fa-solid fa-magnifying-glass text-3xl"></i>
      </button>

      {/* Search Box */}
      <div
        className={`absolute left-12 ml-2 w-56 px-4 flex items-center py-2 border rounded-lg shadow-lg bg-white text-gray-900 transition-all duration-300 ease-in-out
          ${
            showSearchBox
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5 pointer-events-none"
          }`}
      >
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-xl font-oxanium"
        />
        <button className="ml-2 flex">
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchButton;
