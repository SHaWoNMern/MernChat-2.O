import { useState } from "react";

export default function ToggleSwitch() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-800">
      <input
        type="checkbox"
        id="toggle_checkbox"
        className="hidden"
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor="toggle_checkbox"
        className={`relative w-28 h-14 mx-auto rounded-full border-4 transition-colors duration-300 ease-in-out cursor-pointer 
        ${
          checked
            ? "bg-teal-800 border-teal-500"
            : "bg-teal-500 border-teal-800"
        }`}
      >
        <div
          className={`absolute w-8 h-8 text-xl rounded-full transition-all duration-300 ease-in-out 
          ${checked ? "top-0.5 left-16 scale-75" : "top-1.5 left-3 scale-100"}`}
        >
          🔅
        </div>
        <div
          className={`absolute text-2xl transition-all duration-300 ease-in-out 
          ${checked ? "bottom-3 right-4" : "-bottom-14 right-4"}`}
        >
          🌙
        </div>
      </label>
    </div>
  );
}
