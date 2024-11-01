import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LottieAnimation from "../Component/LottieAnimation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Home = () => {
  
  // firebase --------------
  const auth = getAuth();

  // react dom ----------------
  const navigate = useNavigate();
  // state---------------------

  const [darkMode, setDarkMode] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
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
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
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
          navigate("/chathome");
        }, 2000);
        toast.success("Login Successful", {
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
              toast.success("Profile Updated", {
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
            navigate("/");
          }, 2000);
          toast.success("Registration Successful", {
            position: "top-center",
            theme: darkMode ? "dark" : "light",
            transition: Bounce,
          });
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
        });
    }
  };

  return (
    <>
      {/* ---------------- header --------------- */}
      <div
        className={`font-poppins min-h-screen flex flex-col items-center w-full h-full ${
          darkMode ? "bg-dark-image text-white" : "bg-light-image text-gray-900"
        }`}
      >
        <div className="flex flex-col items-center w-[1720px]">
          <img
            src="Logo.png"
            alt="Logo"
            className="w-1/4 animate-fadeIn mt-10"
          />
          <p className="text-3xl mt-7 slideIn-delay font-oxanium">
            where developers unite
          </p>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            theme={darkMode ? "dark" : "light"}
            transition={Bounce}
            limit={1}
          />
          {/* ---------------- header --------------- */}
          <div className="flex justify-between w-full">
            <div className="w-2/3 h-2/3 px-5 animate-bounce">
              <img src="banner.png" alt="" className="mt-20" />
            </div>
            <div
              className={`w-1/3 lg:w-1/3 md:w-1/3 shadow-lg rounded-xl overflow-hidden items-center my-auto mr-20 opacity-90 ${
                darkMode ? "bg-gray-900" : "bg-white"
              } `}
            >
              <div
                className={`w-full md:w-full p-6 md:p-12 ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                {/* ---------login card Heading----------- */}
                <h1
                  className={`text-2xl md:text-3xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  } animate-slideIn`}
                >
                  {isRegistering
                    ? "Get Started With Easy Registration"
                    : "Login To Start Collaborating!"}
                </h1>
                <h3
                  className={`text-lg md:text-xl mb-7 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } animate-slideIn`}
                >
                  It's Free to Use
                </h3>

                {/* ---------Registration Form----------- */}
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
                {/* ---------Registration Form----------- */}

                {/* -----------Login Form--------------- */}
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
                  <button
                    onClick={handleClickShowPassword}
                    className="absolute lg:right-3 lg:top-3 sm:right-1 sm:top-1 text-gray-500 focus:outline-none"
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

                {/* ---------Buttons----------- */}
                <Button
                  color="blue"
                  onClick={isRegistering ? handleRegistration : handleLogin}
                  disabled={!email || !password}
                  className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
                >
                  {isRegistering ? "Sign Up" : "Sign In"}
                </Button>
                <hr className="my-6 border-gray-300 w-full" />
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

                <div className="mt-4 text-center">
                  <span>
                    {isRegistering
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                  </span>
                  <button
                    onClick={toggleForm}
                    type="button"
                    className="text-blue-500 hover:p-1 hover:bg-blue-gray-200 hover:text-white hover:rounded"
                  >
                    {isRegistering ? "Sign In" : "Sign Up"}
                  </button>
                </div>
                {/* ---------Buttons----------- */}

                {/* ---------Dark Mode----------- */}
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
                {/* ---------Dark Mode----------- */}
              </div>
            </div>
          </div>

          {/* -----------Lottie Animations----------- */}
          <div className="flex justify-between w-full">
            <div className="w-1/2"></div>
            <div className=" inline-flex w-1/2 justify-center gap-10 pl-36">
              <div className="flex flex-col items-center w-1/5">
                <LottieAnimation
                  animationKey="interface"
                  width="150px"
                  height="150px"
                  loop={true}
                />{" "}
                <h2 className="text-xl font-bold text-center">
                  Join Us Our, Mern Stack Community
                </h2>
              </div>
              <div className="flex flex-col items-center w-1/5">
                <LottieAnimation
                  animationKey="developer"
                  width="150px"
                  height="150px"
                  loop={true}
                />{" "}
                <h2 className="text-xl font-bold text-center ">
                  Connect, Code, Collabrate!
                </h2>
              </div>
              <div className="flex flex-col items-center w-1/5">
                <LottieAnimation
                  animationKey="user"
                  width="150px"
                  height="150px"
                  loop={true}
                />{" "}
                <h2 className="text-xl font-bold text-center">
                  You're, just One Tap <br />
                  away
                </h2>
              </div>
            </div>
          </div>
          {/* -----------Lottie Animations----------- */}
        </div>
      </div>
    </>
  );
};

export default Home;
