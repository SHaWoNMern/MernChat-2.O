import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const forgetPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="h-screen w-full rounded-lg mt-20">
      <div className="flex flex-col border rounded-md p-4 shadow-md w-96 m-auto">
        <Link to="/">
          <h1 className="text-4xl font-bold text-center mb-5 text-blue-gray-800">
            MernChat
          </h1>
        </Link>
        <h2 className="text-2xl font-bold text-center mb-20">
          Forget Password
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 mb-10"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
              .then(() => {
                alert("Password reset email sent");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert(errorMessage);
              });
          }}
        >
          Reset Password
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default forgetPassword;
