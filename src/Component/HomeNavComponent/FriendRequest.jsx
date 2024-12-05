import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const data = useSelector((state) => state.user.value);
  const db = getDatabase();
  const [friendRequestList, setFriendRequestList] = useState([]);
  useEffect(() => {
    const FriendRequestListRef = ref(db, "friendRequest");
    onValue(FriendRequestListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setFriendRequestList(array);
    });
  }, []);
  // const handleFriend = (uid) => {
  //   set(ref(db, "friend/" + uid), {
  //     senderid: friendRequestList.find((item) => item.uid === uid).senderid,
  //     sendername: friendRequestList.find((item) => item.uid === uid).sendername,
  //     receiverid: friendRequestList.find((item) => item.uid === uid).receiverid,
  //     receivername: friendRequestList.find((item) => item.uid === uid)
  //       .receivername,
  //   });
  // };
  console.log(friendRequestList);
  return (
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {friendRequestList.map((item) => (
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
              <h3 className="text-lg font-medium w-36">{item.sendername}</h3>
            </div>
            <button
              type="button"
              // onClick={handleFriend}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              accpet
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
