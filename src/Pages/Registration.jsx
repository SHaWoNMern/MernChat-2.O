import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "@material-tailwind/react";

const Registration = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    number: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const validateField = (field, value) => {
    switch (field) {
      case "email":
        return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        );
      case "password":
        return value.length < 8;
      case "name":
        return value.length < 4;
      case "number":
        return value.length < 10;
      default:
        return false;
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));

    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    if (Object.values(errors).some((error) => error)) {
      toast.error("Registration Failed", {
        position: "top-center",
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
    } else {
      toast.success("Registration Successful", {
        position: "top-center",
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
      setEmail("");
      setPassword("");
      setName("");
      setNumber("");
      setErrors({ email: false, password: false, name: false, number: false });
    }
  };

  return (
    <div
      className={`font-poppins min-h-screen flex justify-center items-center ${
        darkMode ? "bg-dark-image text-white" : "bg-light-image text-gray-900"
      }`}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme={darkMode ? "dark" : "light"}
        transition={Bounce}
        limit={1}
      />

      <div
        className={`flex w-11/12 lg:w-2/3 shadow-lg rounded-lg overflow-hidden ${
          darkMode ? "bg-gray-900" : "bg-white"
        } `}
      >
        {/* Left Panel */}
        <div className=" md:flex md:w-1/2 bg-login-left bg-cover bg-center items-center justify-center pl-7">
          <div>
            <Link to="/">
              <img src="Logo.png" alt="logo" className="w-2/3" />
            </Link>
            <div className="mt-10 font-audiowide text-4xl">
              <h2 className="">Connect,</h2>
              <h2 className="mt-3">Code,</h2>
              <h2 className="mt-3">Collaborate!</h2>
            </div>
            <p className=" pt-12 font-oxanium text-4xl w-2/3">
              The Ultimate Hub for MERN Stack Developers!
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className={`w-full md:w-1/2 p-6 md:p-12 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <h1
            className={`text-2xl md:text-3xl font-semibold mb-6 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get Started With Easy Registration
          </h1>
          <h3
            className={`text-lg md:text-xl mb-6 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            It's Free to Use
          </h3>

          {/* Full Name Input */}
          <div className="mb-4">
            <Input
              color={darkMode ? "white" : "blue"}
              label="Enter your full name"
              type="text"
              id="name"
              value={name}
              onChange={handleChange("name")}
              error={errors.name}
              size="lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name must be at least 4 characters long
              </p>
            )}
          </div>

          {/* Number Input */}
          <div className="mb-4">
            <Input
              color={darkMode ? "white" : "blue"}
              label="Enter your number"
              type="text"
              id="number"
              value={number}
              onChange={handleChange("number")}
              error={errors.number}
              size="lg"
            />
            {errors.number && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid number
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              color={darkMode ? "white" : "blue"}
              label="Enter your email"
              type="email"
              id="email"
              value={email}
              onChange={handleChange("email")}
              error={errors.email}
              size="lg"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              color={darkMode ? "white" : "blue"}
              label="Enter your password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handleChange("password")}
              error={errors.password}
              size="lg"
            />
            {/* Show Password Icon */}
            <button
              onClick={handleClickShowPassword}
              className="absolute right-3 top-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} className="text-xl" />
              ) : (
                <FontAwesomeIcon icon={faEye} className="text-xl" />
              )}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters long
              </p>
            )}
          </div>

          {/* Login Button */}
          <Button
            color="blue"
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
          >
            Sign Up
          </Button>

          <hr className="my-6 border-gray-300 w-full" />
          {/* Google Login Button */}
          <Button
            size="lg"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3 mx-auto"
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-500 hover:p-1 hover:bg-blue-gray-200 hover:text-white hover:rounded"
            >
              Sign In
            </Link>
          </div>

          {/* Dark Mode Switch */}
          <div className="mt-6 flex items-center justify-center">
            <span className="mr-2">
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div
                className={`w-[40px] h-5 rounded-full peer-focus:outline-none peer-focus:ring-2 ${
                  darkMode
                    ? "bg-gray-600 peer-focus:ring-blue-800"
                    : "bg-gray-200 peer-focus:ring-blue-500"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                    darkMode
                      ? "bg-gray-300 translate-x-5"
                      : "bg-white translate-x-0"
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
