import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const User = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [sentRequests, setSentRequests] = useState({});
  const [receivedRequests, setReceivedRequests] = useState({});
  const data = useSelector((state) => state.user.value);

  const handleFriendRequest = (user) => {
    if (data?.uid !== user.uid && !sentRequests[user.uid]) {
      push(ref(db, "friendRequest/"), {
        senderid: data.uid,
        sendername: data.displayName,
        receiverid: user.uid,
        receivername: user.name,
      })
        .then(() => {
          setSentRequests({ ...sentRequests, [user.uid]: true });
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

  // Fetch sent and received friend requests
  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      const sent = {};
      const received = {};
      snapshot.forEach((item) => {
        const request = item.val();
        if (request.senderid === data?.uid) {
          sent[request.receiverid] = true;
        } else if (request.receiverid === data?.uid) {
          received[request.senderid] = true;
        }
      });
      setSentRequests(sent);
      setReceivedRequests(received);
    });
  }, [data?.uid, db]);

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
                sentRequests[user.uid] || receivedRequests[user.uid]
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              disabled={sentRequests[user.uid] || receivedRequests[user.uid]}
            >
              {sentRequests[user.uid]
                ? "Request Sent"
                : receivedRequests[user.uid]
                ? "Request Received"
                : "Add Friend"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
