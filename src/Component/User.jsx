import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const User = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {userList.map((user) => (
        <div
          key={user.uid}
          className={`flex items-center justify-between p-3 gap-3 rounded-lg mb-2  bg-opacity-50 shadow-lg  hover:bg-blue-gray-100  transform transition duration-300 ease-in-out cursor-context-menu `}
        >
          {/* User Info */}
          <div className="flex items-center">
            <img
              src={user.photo}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium w-36">{user.name}</h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
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
