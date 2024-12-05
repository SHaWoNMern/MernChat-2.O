import React from "react";
import { Link } from "react-router-dom";

const VerifyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification email to your inbox. Please check your email
          and click the verification link to continue.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/">login</Link>
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Didn't receive an email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
