import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { initializeRequestStatus } from "../function/initializeRequestStatus";

const User = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [sentRequests, setSentRequests] = useState({});
  const [receivedRequests, setReceivedRequests] = useState([]);
  const data = useSelector((state) => state.user.value);

  const handleFriendRequest = (user) => {
    if (data?.uid !== user.uid && !sentRequests[user.uid]) {
      // Check if the friend request is already sent
      push(ref(db, "friendRequest/"), {
        senderid: data.uid,
        sendername: data.displayName,
        receiverid: user.uid,
        receivername: user.name,
      })
        .then(() => {
          setSentRequests((prev) => ({ ...prev, [user.uid]: true })); // Mark request as sent
        })
        .catch((error) => {
          console.error("Error sending friend request:", error);
        });
    }
  };

  // Fetch user list
  useEffect(() => {
    const userListRef = ref(db, "users/");
    onValue(userListRef, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        if (data?.uid !== item.key) {
          array.push({ ...item.val(), uid: item.key });
        }
      });
      setUserList(array);
    });
  }, [data?.uid, db]);

  // Fetch friend requests
  useEffect(() => {
    const userListRef = ref(db, "friendRequest/");
    onValue(userListRef, (snapshot) => {
      const sentArray = {};
      const receivedArray = [];
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderid === data?.uid) {
          sentArray[request.receiverid] = true; // Track sent requests
        } else if (request.receiverid === data?.uid) {
          receivedArray.push(request.senderid); // Track received requests
        }
      });
      setSentRequests(sentArray);
      setReceivedRequests(receivedArray);
    });
  }, [data?.uid, db]);

  console.log(receivedRequests);

  // useEffect(() => {
  //   const fetchRequestStatus = async () => {
  //     if (userList.length > 0 && data?.uid) {
  //       const updatedSentRequests = await initializeRequestStatus(
  //         db,
  //         userList,
  //         data.uid
  //       );
  //       setSentRequests(updatedSentRequests);
  //     }
  //   };

  //   fetchRequestStatus();
  // }, [userList, db, data?.uid]);

  return (
    <div className="flex flex-row flex-wrap w-full gap-4 rounded-lg shadow-md p-4 justify-center">
      {userList.map((user) => (
        <div
          key={user.uid}
          className="flex items-center justify-between p-3 gap-3 rounded-lg mb-2 bg-opacity-50 shadow-lg hover:bg-blue-gray-100 transform transition duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <img
              src="dummypp.png"
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
            />
            <div className="ml-3">
              <h3 className="text-lg font-medium w-36">{user.name}</h3>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleFriendRequest(user)}
              className={`px-5 py-2 rounded-lg shadow ${
                sentRequests[user.uid]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={sentRequests[user.uid]}
            >
              {sentRequests[user.uid] ? "Sent" : "Add"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
