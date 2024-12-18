import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const Authentication = () => {
  // firebase --------------
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getDatabase();
  // react dom ----------------
  const navigate = useNavigate();
  const dispach = useDispatch();
  // state---------------------

  const [darkMode, setDarkMode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginError, setLoginError] = useState("");
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

  // boolean ---------------------------
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleForgetPassword = () => {
    navigate("/forgetPassword");
  };

  // toggle form-------------------------
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage("");
    setLoginError("");
  };

  // form handle functions-----------------------------------
  const validateField = (field, value) => {
    if (field === "email") {
      return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      );
    } else if (field === "password") {
      return value.length < 8;
    } else if (field === "name") {
      return value.length < 4;
    } else if (field === "number") {
      return value.length < 10;
    } else {
      return false;
    }
  };
  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setLoginError("");
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));

    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    } else if (field === "name") {
      setName(value);
    } else if (field === "number") {
      setNumber(value);
    }
  };

  // Login------------------------------------------------------
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setTimeout(() => {
          setLoginError("");
          setSuccessMessage("");
          dispach(setUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/home");
        }, 2000);
        toast.success("Login Successful", {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(" Invalid email or password");
        setSuccessMessage("");
        toast.error(errorMessage, {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
      });
    if (!errors.email && !errors.password) {
      setEmail("");
      setPassword("");
      setErrors({ email: false, password: false });
    }
  };

  // Registration------------------------------------------------------
  const handleRegistration = () => {
    if (Object.values(errors).some((error) => error)) {
      toast.error("Registration Failed", {
        position: "top-center",
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            email: email,
            displayName: name,
            phoneNumber: number,
            photoURL:
              "https://templates.joomla-monster.com/joomla30/jm-news-portal/components/com_djclassifieds/assets/images/default_profile.png",
          })
            .then(() => {
              sendEmailVerification(auth.currentUser);
              // google realtime database ---------------
              const dbRef = ref(db, "users/" + user.uid);
              set(dbRef, {
                email: email,
                name: name,
                number: number,
              });
              toast.success({
                position: "top-center",
                theme: darkMode ? "dark" : "light",
                transition: Bounce,
              });
            })
            .catch((error) => {
              const errorMessage = error.message;
              toast.error(errorMessage, {
                position: "top-center",
                theme: darkMode ? "dark" : "light",
                transition: Bounce,
              });
            });
          const user = userCredential.user;

          setTimeout(() => {
            setIsRegistering(true);
            toggleForm();
          }, 2000);
          setSuccessMessage(
            " Registration successful! Please login to continue."
          );
          toast.success("Registration Successful", {
            position: "top-center",
            theme: darkMode ? "dark" : "light",
            transition: Bounce,
          });
          setErrorMessage("");
          setEmail("");
          setPassword("");
          setName("");
          setNumber("");
          setErrors({
            email: false,
            password: false,
            name: false,
            number: false,
          });
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage, {
            position: "top-center",
            theme: darkMode ? "dark" : "light",
            transition: Bounce,
          });
          setErrorMessage(" Registration failed. Please try again.");
        });
    }
  };
  // google login----------------------------------------
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // google realtime database ---------------
        set(ref(db, "users/" + user.uid), {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        toast.success("Login Successful", {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error(errorMessage, {
          position: "top-center",
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
      });
  };

  // enter key---------------------------------------------
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      {/* ---------------- header --------------- */}
      <div
        className={`font-poppins min-h-screen flex flex-col items-center w-full h-full bg-cover ${
          darkMode ? "bg-[#121212] text-white" : "bg-light-image text-gray-900"
        }`}
      >
        <div className="flex flex-col items-center w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <img
            src="Logo.png"
            alt="Logo"
            className="w-1/2 sm:w-1/3 md:w-2/4 animate-fadeIn mt-10"
          />
          <p className="text-3xl sm:text-3xl mt-4 sm:mt-7 animate-fadeIn font-oxanium mb-5 sm:mb-10">
            where developers unite
          </p>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            theme={darkMode ? "dark" : "light"}
            transition={Bounce}
            limit={1}
          />

          {/* Banner and Form */}
          <div
            className={`mt-5 lg:mt-10 border border-gray-300 rounded-xl shadow-md opacity-90 animate-fadeIn px-3
              ${
                darkMode
                  ? "bg-gray-900 bg-opacity-50"
                  : "bg-white bg-opacity-60"
              }`}
          >
            <div className="flex flex-col lg:flex-row justify-between w-full px-10 py-16">
              {/* Banner */}
              <div className="flex justify-center lg:justify-start w-full lg:w-1/2 lg:pl-12 pr-16">
                <div>
                  <img
                    src={darkMode ? "banner-2.png" : "banner-1.png"}
                    alt="Banner"
                    className="w-3/4 md:w-2/3 lg:w-full mt-6 lg:mt-20 animate-bounce"
                  />
                  <img
                    src="banner-shadow.png"
                    alt="bannershadow"
                    className="animate-zoom-in-zoom-out pr-5"
                  />
                </div>
              </div>

              {/* Login / Registration Form */}
              <div
                className={`w-full lg:w-2/3 max-w-md mx-auto lg:mx-0 shadow-lg rounded-xl p-10 mt-8 lg:mt-0 animate-slideIn ${
                  darkMode
                    ? "bg-gray-900 bg-opacity-60"
                    : "bg-blue-50 bg-opacity-30"
                }`}
              >
                {/* --------------- registration success massage ----------------- */}
                {!isRegistering && successMessage && (
                  <div className="bg-teal-500 bg-opacity-80 text-white font-bold py-2 px-4 rounded mb-4">
                    <FaCheckCircle className="inline" />
                    {successMessage}
                  </div>
                )}
                {/* --------------- success massage ----------------- */}

                {/* ----------- registration error message ---------------- */}
                {isRegistering && errorMessage && (
                  <div className="bg-red-500 bg-opacity-80 text-white font-bold py-2 px-4 rounded mb-4">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errorMessage}
                  </div>
                )}
                {/* ----------- registration error message ---------------- */}

                {/* ------------ login error message ---------------- */}
                {!isRegistering && loginError && (
                  <div className="bg-red-500 bg-opacity-80 text-white font-bold py-2 px-4 rounded mb-4">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {loginError}
                  </div>
                )}
                {/* ------------ login error message ---------------- */}

                <div>
                  {/* Header */}

                  <h1
                    className={`text-2xl md:text-3xl font-bold mb-4 sm:mb-6 ${
                      darkMode ? "text-white" : "text-gray-900"
                    } animate-slideIn`}
                  >
                    {isRegistering
                      ? "Get Started With Easy Registration"
                      : "Login To Start Collaborating!"}
                  </h1>
                  <h3
                    className={`text-lg md:text-xl mb-5 sm:mb-7 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } animate-slideIn `}
                  >
                    It's Free to Use
                  </h3>

                  {/* ----------Registration Form------------- */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isRegistering
                        ? "max-h-96 opacity-100 scale-100"
                        : "max-h-0 opacity-0 scale-95"
                    }`}
                  >
                    <div className="transform transition-all duration-500 ease-in-out">
                      <div className="mb-4 mt-2">
                        <Input
                          color={darkMode ? "white" : "blue"}
                          label="Enter your full name"
                          type="text"
                          id="name"
                          value={name}
                          onChange={handleChange("name")}
                          onKeyDown={handleKeyPress}
                          error={errors.name}
                          size="lg"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            Name must be at least 4 characters long
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <Input
                          color={darkMode ? "white" : "blue"}
                          label="Enter your number"
                          type="text"
                          id="number"
                          value={number}
                          onChange={handleChange("number")}
                          onKeyDown={handleKeyPress}
                          error={errors.number}
                          size="lg"
                        />
                        {errors.number && (
                          <p className="text-red-500 text-xs mt-1">
                            Please enter a valid number
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Login Form */}
                  <div className="mb-4">
                    <Input
                      color={darkMode ? "white" : "blue"}
                      label="Enter your email"
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleChange("email")}
                      onKeyDown={handleKeyPress}
                      error={errors.email}
                      size="lg"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>

                  <div className="mb-4 relative">
                    <Input
                      color={darkMode ? "white" : "blue"}
                      label="Enter your password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={handleChange("password")}
                      onKeyDown={handleKeyPress}
                      error={errors.password}
                      size="lg"
                    />
                    <button
                      onClick={handleClickShowPassword}
                      className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl"
                        />
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

                  {/* ----------- forget password ---------------- */}
                  <div className="flex justify-end"></div>
                  <button
                    onClick={handleForgetPassword}
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    Forget Password?
                  </button>
                  {/* Buttons */}

                  <Button
                    color="blue"
                    type="submit"
                    onClick={isRegistering ? handleRegistration : handleLogin}
                    disabled={!email || !password}
                    className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
                  >
                    {isRegistering ? "Sign Up" : "Sign In"}
                  </Button>
                  <hr className="my-6 border-gray-300 w-full" />
                  {/* -----------Google Button------------ */}
                  <Button
                    size="lg"
                    variant="outlined"
                    color="blue-gray"
                    className="flex items-center gap-3 mx-auto"
                    onClick={handleGoogleLogin}
                  >
                    <img
                      src="https://docs.material-tailwind.com/icons/google.svg"
                      alt="Google"
                      className="h-6 w-6"
                    />
                    Continue with Google
                  </Button>

                  <div className="mt-4 text-center">
                    <span>
                      {isRegistering
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    </span>
                    <button
                      onClick={toggleForm}
                      onKeyUp={handleKeyPress}
                      on
                      onKeyDown={handleKeyPress}
                      type="button"
                      className="text-blue-500 hover:p-1 hover:bg-blue-gray-200 hover:text-white hover:rounded"
                    >
                      {isRegistering ? "Sign In" : "Sign Up"}
                    </button>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="mt-6 flex items-center justify-center">
                    <span className="mr-2">
                      {darkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"}
                    </span>
                    <label className="relative flex items-center cursor-pointer border-2 border-gray-500 rounded-full">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-10 h-5 rounded-full flex items-center justify-${
                          darkMode ? "end" : "start"
                        } transition-colors ${
                          darkMode ? "bg-gray-900" : "bg-gray-200"
                        } `}
                      >
                        <div
                          className={`w-5 h-5 rounded-full shadow-lg transition-transform  ease-in-out flex items-center justify-center `}
                        >
                          {darkMode ? (
                            <MdLightMode className="text-gray-100 text-xl" />
                          ) : (
                            <MdDarkMode className="text-black text-xl" />
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
