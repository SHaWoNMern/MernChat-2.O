import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-sky-300 flex flex-col justify-center items-center text-center font-custom text-black">
      <img src="Logo.png" alt="Logo" className="w-1/2 animate-fadeIn" />
      <p className="text-7xl mb-8 mt-7 slideIn-delay">where developers unite</p>
      <p className="text-4xl slideIn-delay w-2/3 mb-5">
        Dive into a vibrant community designed for coders and creators. Connect
        with like-minded individuals, share your projects, and get real-time
        feedback. Whether you’re brainstorming ideas, troubleshooting code, or
        collaborating on innovative solutions, MernChat is your go-to platform
        for seamless communication and collaboration. Join us and turn your
        coding dreams into reality!
      </p>
      <p>and need some change</p>
      <div className="space-x-4">
        <Button
          color="lightBlue"
          size="lg"
          className="animate-bounce hover:bg-blue-800"
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button
          color="lightBlue"
          size="lg"
          className="animate-bounce hover:bg-blue-800"
        >
          <Link to="/registration">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
