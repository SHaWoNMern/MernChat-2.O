import React from "react";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Friend = () => {
  const data = useSelector((state) => state.user.value);
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);

  // Fetch user list--------------
  useEffect(() => {
    const FriendListRef = ref(db, "friend");
    onValue(FriendListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (
          data.uid === item.val().receiverid ||
          data.uid === item.val().senderid
        ) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setFriendList(array);
    });
  }, [data.uid, db]);

  const handleBlock = (item) => {
    if (data.uid === item.senderid) {
      set(push(ref(db, "blockList/")), {
        blockby: item.sendername,
        blockbyid: item.senderid,
        blocked: item.receivername,
        blockedid: item.receiverid,
      })
        .then(() => {
          remove(ref(db, "friend/" + item.uid));
        })
        .catch((error) => {
          console.error("Error Blocking:", error);
        });
    } else {
      set(push(ref(db, "blockList/")), {
        blockedBy: item.receivername,
        blockbyid: item.receiverid,
        blocked: item.sendername,
        blockedid: item.senderid,
      })
        .then(() => {
          remove(ref(db, "friend/" + item.uid));
        })
        .catch((error) => {
          console.error("Error Blocking:", error);
        });
    }
  };
  return (
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {friendList.length > 0 ? (
        friendList.map((item) => (
          <div
            key={item.uid}
            className="flex items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <img
                src="dummypp.png"
                alt=""
                className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
              />
              <div className="ml-3">
                <h3 className="text-lg font-medium w-36">
                  {data.uid === item.senderid
                    ? item.receivername
                    : item.sendername}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleBlock(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Block
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-2xl font-bold mb-4">No Friend Found</h2>
      )}
    </div>
  );
};

export default Friend;
