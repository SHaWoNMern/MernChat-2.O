import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Friend = () => {
  const data = useSelector((state) => state.user.value);
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const FriendListRef = ref(db, "friend");
    onValue(FriendListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setFriendList(friendList);
    });
  }, []);
  console.log(friendList);
  return (
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {friendList.map((item) => (
        <div
          key={item.uid}
          className="flex items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <img
              src=""
              alt=""
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium w-36">{item.sendername}</h3>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              accpet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friend;
