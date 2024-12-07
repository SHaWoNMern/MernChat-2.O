import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const blocking = () => {
  let [blockList, setBlockList] = useState([]);
  let data = useSelector((state) => state.user.value);
  const db = getDatabase();

  // Fetch Blocked list--------------
  useEffect(() => {
    const blockListRef = ref(db, "blockList/");
    onValue(blockListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (data.uid === item.val().blockbyid) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setBlockList(array);
    });
  }, [data.uid, db]);
  const handleUnblock = (item) => {
    remove(ref(db, "blockList/" + item.uid));
  };

  return (
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {blockList.length > 0 ? (
        blockList.map((item) => (
        <div className="flex items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out">
          <div className="flex items-center">
            <img
              src="dummypp.png"
              alt=""
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium w-36">{item.blocked}</h3>
            </div>
            <button
              type="button"
              onClick={() => handleUnblock(item)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Unblock
            </button>
          </div>
        </div>
      ))
        
      )
      : (
        <h2 className="text-2xl font-bold mb-4">No Blocked User</h2>
      )}
    </div>
  );
};

export default blocking;
