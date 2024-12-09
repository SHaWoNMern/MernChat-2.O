import React from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useState, useEffect } from "react";

const MyGroup = () => {
  const data = useSelector((state) => state.user.value);
  const db = getDatabase();

  let [groups, setGroups] = useState([]);

  useEffect(() => {
    {
      const groupsRef = ref(db, "groups/");
      onValue(groupsRef, (snapshot) => {
        const groupsArray = [];
        snapshot.forEach((item) => {
          if (data.uid == item.val().createdBy.id) {
            groupsArray.push({ id: item.key, ...item.val() });
          }
        });
        setGroups(groupsArray);
      });
    }
  }, [db]);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex flex-row flex-wrap w-2/3 gap-4 rounded-lg shadow-md p-4 justify-between">
        {groups.map((item) => (
          <div
            key={item.id}
            className="flex w-96 items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <img
                src="dummypp.png"
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.groupName}</h2>
                <p className="text-sm text-gray-500">
                  Admin: {item.createdBy ? item.createdBy.name : "Unknown"}
                </p>
              </div>
            </div>
            <div className="ml-8">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Enter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroup;
