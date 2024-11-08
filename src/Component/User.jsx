import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const User = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);

  useEffect(() => {
    const userListRef = ref(db, "users");
    onValue(userListRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val());
      });
      setUserList(array);
    });
  }, []);
  console.log(userList);
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 font-poppins">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Friends
      </h2>

      {userList.map((user) => (
        <div
          key={user.uid}
          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2"
        >
          {/* User Info */}
          <div className="flex items-center">
            <img
              src={user.photo}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {user.name}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
              Add
            </button>
            <button className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow hover:bg-gray-400 dark:hover:bg-gray-500">
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
